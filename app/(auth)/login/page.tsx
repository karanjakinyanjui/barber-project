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
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0 bg-gray-300">
        <img
          src="https://picsum.photos/1200/800"
          alt="Random Image"
          className="w-full h-full object-cover"
          style={{
            filter: "grayscale(1) contrast(1.2) opacity(0.4)",
          }}
        />
      </div>

      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 dark:text-white text-lg mb-1 text-center font-medium title-font">
            Log In
          </h2>
          <div className="relative mb-4 ">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}

type FormData = z.infer<typeof loginFormSchema>;

// Define the form field data
const formFields = [
  {
    name: "username",
    label: "Username",
    placeholder: "username",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dark:bg-gray-900 dark:text-gray-100  space-y-3 p-2 rounded-md"
      >
        {formFields.map(({ name, label, placeholder, description, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as "username" | "password"}
            render={({ field }) => (
              <FormItem className="dark:border-gray-600">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type={type || "text"}
                    placeholder={placeholder}
                    {...field}
                    className="dark:bg-gray-800 dark:text-gray-100"
                  />
                </FormControl>
                {description && (
                  <FormDescription className="dark:text-gray-400">
                    {description}
                  </FormDescription>
                )}
                <FormMessage className="dark:text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
