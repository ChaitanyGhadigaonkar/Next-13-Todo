import { updateTodo } from "@/app/actions";
import ButtonComponent from "@/components/ButtonComponent";
import { TodoType } from "@/app/types";
import DeleteTodoButton from "./DeleteTodoButton";

async function page({ params }: { params: { id: string } }) {
  const todo: TodoType | null = await prisma.todo.findFirst({
    where: { id: params.id },
  });

  // binds the arguments in server actions
  const updateTodoWithId = updateTodo.bind(null, params.id);

  return (
    <main className="flex-1 flex flex-col justify-center items-center my-5">
      <h1 className="font-semibold ">Edit Todo</h1>

      <form
        className="flex flex-col w-full flex-1 gap-3 px-5 sm:w-1/2"
        action={updateTodoWithId}
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
            defaultValue={todo?.title}
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
            defaultValue={todo?.description}
          />
        </div>
        <div className="flex gap-1 px-1">
          <label htmlFor="completed">Mark as completed</label>
          <input
            type="checkbox"
            name="completed"
            id="completed"
            defaultChecked={todo?.completed}
          />
        </div>
        <div className="flex justify-between items-center px-5">
          <ButtonComponent
            className="bg-blue-600 hover:bg-blue-500 px-3 text-white my-2"
            variant={"default"}
            type="submit"
          >
            Update
          </ButtonComponent>
          <DeleteTodoButton id={todo?.id} />
        </div>
      </form>
    </main>
  );
}

export default page;
