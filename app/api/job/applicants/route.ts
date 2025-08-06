import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function PUT(request: Request) {
    const body = await request.json();
    const { userId } = await auth();
    const { id, status } = body;

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const checkOwner = await prisma.application.findUnique({
            where: { id: id },
            select: { job: { select: { createdBy: true } } },
        });

        if (!checkOwner || checkOwner.job.createdBy !== userId) {
            return NextResponse.json({ message: "You are not authorized to update this application" }, { status: 403 });
        }

        const updatedApplication = await prisma.application.update({
            where: { id: id },
            data: { status: status },
        });

        return NextResponse.json({ message: "Application status updated successfully", data: updatedApplication });
    } catch (error) {
        console.error("Error updating application status:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}