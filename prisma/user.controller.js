import { prisma } from "./db.js";

const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.status(201).json({ data: newUser });
  } catch (error) {
    // Prisma unique constraint error code: P2002
    if (error && error.code === "P2002") {
      return res.status(409).json({ error: "A user with this email already exists" });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { createUser };