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
            Sign Up
          </h2>
          <div className="relative mb-4">
            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}

type FormData = z.infer<typeof signupFormSchema>;

const formFields = [
  {
    name: "username",
    label: "Username",
    placeholder: "your username",
    description: "Username",
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

      console.log("Server Response:", response);

      if (response.ok) {
        const { message } = await response.json();
        console.log(message);
      } else {
        const { message } = await response.json();
        console.error("Signup failed:", message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  const formFields = [
    {
      name: "username",
      label: "Username",
      placeholder: "your username",
      description: "Username",
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
                    className={`dark:bg-gray-800 dark:text-gray-300 border ${
                      name === "confirmPassword" ? "border-red-500" : ""
                    }`}
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

        <Button type="submit" className="dark:bg-gray-800 dark:text-gray-300">
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
