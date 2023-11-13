import Todo from "../components/Todo";
import { SessionType, TodoType } from "./types";
import prisma from "./lib/prisma";
import { todoSchema } from "./validationSchemas";
import { redirect } from "next/navigation";
import { auth } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const todos: TodoType[] = await prisma.todo.findMany();
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center my-4">All Tasks of</h1>
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
