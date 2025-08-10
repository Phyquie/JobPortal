import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, email, firstName, lastName } = body;
        if (!id) {
            return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: id },
        });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 200 });
        }

        const newUser = await prisma.user.create({
            data: {
                clerkId: id,
                email,
                firstName,
                lastName,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
