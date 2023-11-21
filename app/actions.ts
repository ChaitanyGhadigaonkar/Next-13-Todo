"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { todoSchema } from "./validationSchemas";
import { MouseEventHandler } from "react";
import { auth } from "./api/auth/[...nextauth]/route";
import { TodoType, sessionType } from "./types";

export async function updateTodo(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authorized");
  }
  const title = formData.get("title")?.valueOf();
  const description = formData.get("description")?.valueOf();
  const completed = formData.get("completed")?.valueOf();

  const parsedData = todoSchema.parse({
    title,
    description,
    completed: completed === "on" ? true : false,
  });
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) throw new Error("Task does not exists");
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      title: parsedData.title,
      description: parsedData.description,
      completed: parsedData.completed,
    },
  });
  redirect("/");
}

export async function deleteTodo(
  id: string,
  mouseEvent: MouseEventHandler<HTMLButtonElement>
) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authorized");
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) throw new Error("Task does not exists");
  const deletedTodo = await prisma.todo.delete({ where: { id: id } });
  redirect("/");
}

export async function register(formData: FormData) {
  const name = formData.get("name")?.valueOf();
  const email = formData.get("email")?.valueOf();
  const password = formData.get("password")?.valueOf();
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof name === "string"
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("user already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    redirect("/api/auth/signin?callbackUrl=/server");
  }
}
