import Todo from "../components/Todo";
import { TodoType } from "./types";
import prisma from "./lib/prisma";
import { todoSchema } from "./validationSchemas";
import { redirect } from "next/navigation";

async function updateTodo(id: string, formData: FormData) {
  "use server";
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

async function deleteTodo(id: string) {
  const deletedTodo = await prisma.todo.delete({ where: { id: id } });
  if (!deleteTodo) {
    throw new Error("Operation cancelled");
  }
  redirect("/");
}

export default async function Home() {
  const todos: TodoType[] = await prisma.todo.findMany();

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center my-4">All Tasks</h1>
      <div className="todos-container grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    </div>
  );
}
