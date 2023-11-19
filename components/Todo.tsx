"use client";
import React from "react";
import ButtonComponent from "./ButtonComponent";
import { TodoType } from "../app/types";
import { Trash2, FileEdit } from "lucide-react";
import Link from "next/link";
import DeleteTodoButton from "@/app/todo/[id]/DeleteTodoButton";
import ToggleComplete from "./ToggleComplete";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type propTypes = {
  todo: TodoType;
};

const Todo = ({ todo }: propTypes) => {
  const { id, description, title, completed } = todo;
  const { data: session } = useSession();

  // console.log(session);
  return (
    <>
      <div className="flex flex-col px-4 py-4 mx-2 justify-between shadow-xl rounded-xl dark:bg-[#183D3D]">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-zinc-500 text-sm py-2 dark:text-[#F7EFE5]">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <ToggleComplete
            id={id}
            completed={completed}
            title={title}
            description={description}
          />

          <div className="icons flex justify-between">
            <ButtonComponent variant={"icon"}>
              <Link href={`/todo/${id}`}>
                <FileEdit className="dark:text-white" />
              </Link>
            </ButtonComponent>
            <DeleteTodoButton id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
