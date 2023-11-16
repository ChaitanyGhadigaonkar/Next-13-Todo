import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    // console.log(name, email, password);
    if (!name || !email || !password) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }
    // check wether the user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        { msg: "user already exists please login" },
        { status: 200 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 400 });
  }
}
