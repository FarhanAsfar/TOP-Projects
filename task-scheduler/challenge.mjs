let currentTask = null;
let pausedStack = [];
let waitingQueue = [];
let currentTimer = null;
let startTime = 0;

// Helper sleep function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function processTask(newTask) {
  newTask.remaining = 5000; // every task must run for 5s

  // --- If no current task, just run it ---
  if (!currentTask) {
    currentTask = newTask;
    runTask(currentTask);
    return;
  }

  // --- If a task is already running, check priority ---
  if (newTask.priority > currentTask.priority) {
    console.log(
      `⚡ Higher priority task (${newTask.priority}) arrived. Pausing ${currentTask.id}`
    );

    // Pause the current task
    const elapsed = Date.now() - startTime;
    clearTimeout(currentTimer);
    currentTask.remaining -= elapsed;
    pausedStack.push(currentTask);

    // Run the higher-priority task immediately
    currentTask = newTask;
    runTask(currentTask);
  } else {
    console.log(
      `🕓 Lower priority task (${newTask.priority}) queued while ${currentTask.id} is running`
    );
    waitingQueue.push(newTask);
  }
}

async function runTask(task) {
  console.log(`▶️ Starting ${task.id} (priority ${task.priority})`);
  startTime = Date.now();

  // Run task for its remaining time (simulate 5s processing)
  currentTimer = setTimeout(() => {
    console.log(`✅ Finished ${task.id}`);
    task.setTaskDone("Task Done");

    // After completion: resume paused or pick next
    if (pausedStack.length > 0) {
      currentTask = pausedStack.pop();
      console.log(`🔄 Resuming ${currentTask.id} with ${currentTask.remaining}ms left`);
      runTask(currentTask);
    } else if (waitingQueue.length > 0) {
      // Pick next normal task
      currentTask = waitingQueue.shift();
      runTask(currentTask);
    } else {
      currentTask = null;
      console.log("🟢 All tasks completed. Idle...");
    }
  }, task.remaining);
}
