import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/app/lib/prisma";
import { todoSchema } from "@/app/validationSchemas";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    const todo = await Prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return NextResponse.json(
        { msg: "Task not found", success: "false" },
        { status: 400 }
      );
    }

    return NextResponse.json({ todo, success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { msg: "task not found", success: "false" },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    const todo = await Prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return NextResponse.json(
        { msg: "Task not found", success: "false" },
        { status: 400 }
      );
    }
    const parsed = todoSchema.safeParse(await req.json());
    // console.log(body.data.title);
    if (parsed.success) {
      const update = await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          title: parsed.data.title,
          description: parsed.data.description,
          completed: parsed.data.completed,
        },
      });
      return NextResponse.json({ update, success: true }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json(
      { msg: "task not found", success: "false" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    const todo = await Prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return NextResponse.json(
        { msg: "Task not found", success: "false" },
        { status: 400 }
      );
    }

    const deletedTodo = await Prisma.todo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ deletedTodo, success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { msg: "task not found", success: "false" },
      { status: 400 }
    );
  }
}
