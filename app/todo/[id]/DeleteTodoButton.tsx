"use client";
import ButtonComponent from "@/components/ButtonComponent";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const DeleteTodoButton = ({ id }: { id: string | undefined }) => {
  const router = useRouter();
  const deleteTodo = async () => {
    const res = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });
    const deletedTodo = await res.json();
    toast.success("Task deleted successfully");
    router.push("/");
    router.refresh();
  };
  return (
    <ButtonComponent
      variant={"icon"}
      onClick={deleteTodo}
    >
      <Trash2 className="dark:text-white" />
    </ButtonComponent>
  );
};

export default DeleteTodoButton;
