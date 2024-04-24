import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  const { username, phone, name, role, password } = req.json();

  try {
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

    return new Response(
      JSON.stringify({ message: "User created successfully", user }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
