"use server";

import { redirect } from "next/navigation";
import { todoSchema } from "./validationSchemas";
import { MouseEventHandler } from "react";

export async function updateTodo(id: string, formData: FormData) {
  const title = formData.get("title")?.valueOf();
  const description = formData.get("description")?.valueOf();
  const completed = formData.get("completed")?.valueOf();

  const parsedData = todoSchema.parse({
    title,
    description,
    completed: completed === "on" ? true : false,
  });

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
  const deletedTodo = await prisma.todo.delete({ where: { id: id } });
  redirect("/");
}
