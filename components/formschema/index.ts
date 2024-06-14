import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const signupFormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(14, { message: "Username must be at most 14 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
