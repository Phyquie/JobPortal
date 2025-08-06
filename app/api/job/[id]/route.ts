import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const job = await prisma.job.findUnique({
            where: { id: params.id },
        });
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        if (!job) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Job fetched successfully", data: job });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const job = await prisma.job.delete({
            where: { id: params.id, createdBy: userId },
        });

        return NextResponse.json({ message: "Job deleted successfully", data: job });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}