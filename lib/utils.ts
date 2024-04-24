import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as jwt from "jsonwebtoken";

interface User {
  username: string;
  role: string;
  name: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateToken(req: Request): User | null {
  console.log(req.headers);
  let token = req.headers.get("Authorization");
  if (!token) {
    return null;
  }
  token = token.split(" ").pop() as string;
  const decoded = jwt.verify(token, "secret");
  console.log(decoded);
  if (decoded) {
    return decoded as User;
  }
  return null;
}

export function isAdmin(req: Request) {
  const decoded = validateToken(req);
  if (decoded) {
    return decoded.role === "admin";
  }
  return false;
}
