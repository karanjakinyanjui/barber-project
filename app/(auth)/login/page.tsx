"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/components/formschema";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <LoginForm />
    </div>
  );
}

type FormData = z.infer<typeof loginFormSchema>;

// Define the form field data
const formFields = [
  {
    name: "username",
    label: "Username",
    placeholder: "shadcn",
    description: "Username",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "******",
    type: "password",
  },
];

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Handle successful login, e.g., store token in local storage or cookies
        console.log("Login successful, token:", token);
      } else {
        const { message } = await response.json();
        console.error("Login failed:", message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map(({ name, label, placeholder, description, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as "username" | "password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type={type || "text"}
                    placeholder={placeholder}
                    {...field}
                  />
                </FormControl>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
