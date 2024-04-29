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
import { signupFormSchema } from "@/components/formschema";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <SignupForm />
    </div>
  );
}

type FormData = z.infer<typeof signupFormSchema>;

const formFields = [
  {
    name: "username",
    label: "Username",
    placeholder: "your username",
    description: "This is your public display name.",
  },
  {
    name: "name",
    label: "Name",
    placeholder: "your name",
    description: "Name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "example@email.com",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "******",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "******",
    type: "password",
  },
];

export function SignupForm() {
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { message } = await response.json();
        console.log(message);
      } else {
        const { message, error } = await response.json();
        console.error("Signup failed:", message, error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map(({ name, label, placeholder, description, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={
              name as
                | "username"
                | "name"
                | "email"
                | "password"
                | "confirmPassword"
            }
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

        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
