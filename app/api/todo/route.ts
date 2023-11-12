import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { todoSchema } from "@/app/validationSchemas";

export async function GET(req: NextRequest) {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 201 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = todoSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { msg: validation.error.format() },
      { status: 400 }
    );
  }
  const newTodo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(
    { msg: "Todo added successfully", todo: newTodo },
    { status: 201 }
  );
}
