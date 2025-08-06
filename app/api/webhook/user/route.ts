import { NextResponse } from "next/server";
import prisma from "@/prisma/client";




export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { id, email, firstName, lastName } = body;

        if (!id) {
            return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
        }

        await prisma.user.upsert({
            where: { clerkId: id },
            create: {
                clerkId: id,
                email: email || "",
                firstName: firstName || "",
                lastName: lastName || "",
            },
            update: {
                email: email || "",
                firstName: firstName || "",
                lastName: lastName || "",
            },
        });
        return NextResponse.json({ message: "User profile updated or created successfully successfully" });

    } catch (error) {
        console.error("Error in webhook:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }





}