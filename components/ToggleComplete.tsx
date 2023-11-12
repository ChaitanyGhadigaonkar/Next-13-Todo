"use client";
import ButtonComponent from "./ButtonComponent";
import { TodoType } from "@/app/types";
import { useRouter } from "next/navigation";

const ToggleComplete = ({ id, description, title, completed }: TodoType) => {
  const router = useRouter();
  const update = async () => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, completed }),
      });
      const todo = await res.json();
      router.push("/");
      router.refresh();
    } catch (err) {
      if (typeof err === "string") {
        throw new Error(err);
      } else if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };
  return (
    <ButtonComponent
      variant={completed === true ? "completed" : "inCompleted"}
      className="w-[100px] my-2"
      title={`${completed ? "Mark as in completed" : "Mark as completed"} `}
      onClick={update}
    >
      {completed === true ? "Completed" : "InCompleted"}
    </ButtonComponent>
  );
};

export default ToggleComplete;
