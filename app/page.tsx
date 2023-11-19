import Todo from "../components/Todo";
import { TodoType, sessionType } from "./types";
import prisma from "./lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "./api/auth/[...nextauth]/route";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }
  const todos: TodoType[] = await prisma.todo.findMany({
    where: {
      email: (session as sessionType).user.email,
    },
  });

  return (
    <div className="">
      <h1 className="text-lg font-semibold text-center my-4">All Tasks</h1>
      <div className="todos-container grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <Suspense fallback={<p>Loding ...</p>}>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
