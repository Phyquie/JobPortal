import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const savedJobs = await prisma.savedJob.findMany({
            where: {
                userId: userId,
            },
            include: {
                job: {
                    include: {
                        company: {
                            select: { name: true, logoUrl: true, id: true },
                        },
                    },
                },
            },
        });

        return NextResponse.json({ message: "Saved jobs fetched successfully", data: savedJobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Validate required fields
    if (!body.jobId) {
        return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }

    try {
        const savedJob = await prisma.savedJob.create({
            data: {
                userId,
                jobId: body.jobId,
            },
        });

        return NextResponse.json({ message: "Job saved successfully", data: savedJob });
    } catch (error) {
        console.error("Error saving job:", error);
        return NextResponse.json({ message: "Failed to save job" }, { status: 500 });
    }
}
export async function DELETE(request: Request) {
    const { userId } = await auth();
    const body = await request.json();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Validate required fields
    if (!body.jobId) {
        return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }

    try {
        const deletedSavedJob = await prisma.savedJob.deleteMany({
            where: {
                userId,
                jobId: body.jobId,
            },
        });

        if (deletedSavedJob.count === 0) {
            return NextResponse.json({ message: "No saved job found with the provided ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "Saved job deleted successfully" });
    } catch (error) {
        console.error("Error deleting saved job:", error);
        return NextResponse.json({ message: "Failed to delete saved job" }, { status: 500 });
    }
}


