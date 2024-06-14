"use client";

import { Role, User } from "@prisma/client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { UserData, saveUser } from "./userAction";

interface Props {
  user?: User;
}

export default function UserForm({ user }: Props) {
  const [data, setData] = React.useState<UserData>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    role: user?.role ?? "EMPLOYEE",
    email: user?.email ?? "",
    id: user?.id,
  });
  const [loading, setLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = (name: keyof UserData) => {
    return {
      name,
      value: data[name],
      onChange: handleChange,
      onValueChange: (value: string) => setData({ ...data, [name]: value }),
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    saveUser(data);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {user ? "Edit User" : "Create User"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} id="name" placeholder="Max" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input {...register("phone")} id="phone" type="phone" />
          </div>
          {!user && (
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} id="email" type="email" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Combobox
              className=" w-full"
              {...register("role")}
              items={Object.keys(Role).map((i) => ({
                value: i,
                label: i,
              }))}
            />
          </div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button onClick={handleSubmit} className="w-full">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
