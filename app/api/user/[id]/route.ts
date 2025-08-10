import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const userId = id

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const userProfile = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!userProfile) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User profile fetched successfully", data: userProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { userId } = await auth();
    const body = await request.json();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }



    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                savedResumeUrl: body.savedResumeUrl,
            },
        });

        return NextResponse.json({ message: "User profile updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

