import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    // Extract data from request body
    const { username, phone, name, role, password } = req.body;

    if (!username || !phone || !name || !role || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        username,
        phone,
        name,
        role,
        password: hashedPassword,
      },
    });

    console.log("User created:", user);

    return res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    console.error("Error details:", error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
