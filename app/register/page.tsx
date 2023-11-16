import ButtonComponent from "@/components/ButtonComponent";
import Link from "next/link";
import React from "react";
import { register } from "../actions";

const page = () => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center my-5">
      <h1 className="font-semibold ">Add Todo</h1>

      <form
        className="flex flex-col w-full flex-1 gap-3 px-5 sm:w-1/2"
        action={register}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-base "
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-base "
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-base "
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            className="outline-none px-2 py-2 text-sm rounded-lg border-[1px] active:border-slate-600 focus:border-slate-600"
            placeholder="Enter password"
          />
        </div>
        <Link
          href={"/api/auth/signin?callbackUrl=/server"}
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
        >
          Already a user?
        </Link>
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
