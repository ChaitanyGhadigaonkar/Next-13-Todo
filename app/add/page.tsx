import React from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { redirect } from "next/navigation";
import { todoSchema } from "../validationSchemas";
import { auth } from "../api/auth/[...nextauth]/route";
import { sessionType } from "../types";

async function addTodo(formData: FormData) {
  "use server";
  const session = await auth();
  // console.log(session);
  if (!session) {
    throw new Error("Not login");
  }
  const description = formData.get("description")?.valueOf();
  const title = formData.get("title")?.valueOf();

  if (typeof description !== "string" || typeof title !== "string") {
    throw new Error("title and description");
  }
  const validation = todoSchema.safeParse({ title, description });
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      User: {
        connect: {
          email: (session as sessionType).user.email,
        },
      },
    },
  });
  // toast.success("Task added successfully");
  redirect("/");
}
const page = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center my-5">
      <h1 className="font-semibold ">Add Todo</h1>

      <form
        className="flex flex-col w-full flex-1 gap-3 px-5 sm:w-1/2"
        action={addTodo}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="text-base "
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600 dark:text-zinc-900"
            placeholder="Enter Title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-base "
          >
            Description
          </label>
          <textarea
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600 dark:text-zinc-900"
            placeholder="Description of the task"
            name="description"
            rows={4}
          />
        </div>
        <ButtonComponent
          className="mx-auto bg-blue-600 hover:bg-blue-500 px-3 text-white my-2"
          variant={"default"}
          type="submit"
        >
          Submit
        </ButtonComponent>
      </form>
    </main>
  );
};

export default page;
