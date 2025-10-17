const events = new Map(); // key -> [ { id, data, timestamp } ]
const consumed = new Map(); // `${key}:${groupId}` -> Set(eventIds)
const waiting = new Map(); // key -> [ { resolve, groupId, timeoutId } ]

function getUnconsumedEvents(key, groupId) {
  const evts = events.get(key) || [];
  const consumedSet = consumed.get(`${key}:${groupId}`) || new Set();
  return evts.filter((e) => !consumedSet.has(e.id));
}

function markConsumed(key, groupId, eventsList) {
  const id = `${key}:${groupId}`;
  if (!consumed.has(id)) consumed.set(id, new Set());
  const set = consumed.get(id);
  for (const e of eventsList) set.add(e.id);
}

function cleanupWaiting(key, resolveFn) {
  if (!waiting.has(key)) return;
  waiting.set(
    key,
    waiting.get(key).filter((w) => w.resolve !== resolveFn)
  );
}

export async function blockingGet(key, groupId) {
  const unconsumed = getUnconsumedEvents(key, groupId);
  if (unconsumed.length > 0) {
    markConsumed(key, groupId, unconsumed);
    return unconsumed.map((e) => e.data);
  }

  return await new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve([]); // return empty array after 30s
      cleanupWaiting(key, resolve);
    }, 30_000);

    if (!waiting.has(key)) waiting.set(key, []);
    waiting.get(key).push({ resolve, groupId, timeoutId });
  });
}

export async function push(key, data) {
  const evt = {
    id: Date.now() + Math.random().toString(36).slice(2),
    data,
    timestamp: Date.now(),
  };

  if (!events.has(key)) events.set(key, []);
  events.get(key).push(evt);

  // Remove after 2 minutes
  setTimeout(() => {
    const arr = events.get(key) || [];
    events.set(
      key,
      arr.filter((e) => e.id !== evt.id)
    );
  }, 120_000);

  // First, group waiters by groupId to enforce "only one per group" rule
const consumers = waiting.get(key) || [];
const waitersByGroup = new Map(); // groupId -> array of waiters

// Group consumers by groupId
for (const waiter of consumers) {
    const { groupId } = waiter;
    if (!waitersByGroup.has(groupId)) {
        waitersByGroup.set(groupId, []);
    }
    waitersByGroup.get(groupId).push(waiter);
}

const remaining = [];

// For each group, pick ONLY ONE waiter to receive events
for (const [groupId, groupWaiters] of waitersByGroup) {
    if (groupWaiters.length === 0) continue;
    
    // Pick the first waiter in this group (FIFO)
    const selectedWaiter = groupWaiters[0];
    const { resolve, timeoutId } = selectedWaiter;
    
    // Get unconsumed events for this group
    const unconsumed = getUnconsumedEvents(key, groupId);
    
    if (unconsumed.length > 0) {
        // Only THIS waiter gets the events
        clearTimeout(timeoutId);
        markConsumed(key, groupId, unconsumed);
        resolve(unconsumed.map((e) => e.data));
        
        // Other waiters in same group go to remaining (they continue waiting)
        for (let i = 1; i < groupWaiters.length; i++) {
            remaining.push(groupWaiters[i]);
        }
    } else {
        // No events for this group, all waiters continue waiting
        remaining.push(...groupWaiters);
    }
}

// Update waiting consumers with remaining waiters
waiting.set(key, remaining);
}
