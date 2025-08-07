import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const job = await prisma.job.findUnique({
            where: { id: id },
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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const jobExists = await prisma.job.findUnique({
            where: { id: id },
        });

        if (!jobExists) {
            return NextResponse.json({ message: "Job not found" }, { status: 404 });
        } else if (jobExists.createdBy !== userId) {
            return NextResponse.json({ message: "You are not authorized to delete this job" }, { status: 403 });
        }

        await prisma.application.deleteMany({
            where: { jobId: id },
        });

        const job = await prisma.job.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Job deleted successfully", data: job });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
