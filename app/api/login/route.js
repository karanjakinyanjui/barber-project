// import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";
// import * as jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// const generateJWT = ({ username, role, name }) => {
//   const token = jwt.sign({ username, role, name }, "secret", {
//     expiresIn: "1h",
//   });
//   return token;
// };

// export async function GET(req) {
//   return new Response(
//     JSON.stringify({
//       message: "Login successful",
//       token: generateJWT({
//         username: "admin",
//         role: "admin",
//         name: "Admin",
//       }),
//     })
//   );
// }

// export async function POST(req) {
//   const { username, password } = req.json();

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         username,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     return new Response(
//       JSON.stringify({ message: "Login successful", token: generateJWT(user) }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error("Error logging in:", error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const generateJWT = ({ id, username, role, name }) => {
  const token = jwt.sign({ id, username, role, name }, "secret", {
    expiresIn: "1h",
  });
  return token;
};

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: "Incorrect password" }), {
        status: 401,
      });
    }

    const { id, role, name } = user;

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token: generateJWT({ id, username, role, name }),
        user_id: id,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error logging in:", error.message);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
