import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const JobId = id;
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const job = await prisma.job.findUnique({
            where: { id: JobId },
        });
        if (!job) {
            return NextResponse.json({ message: "Job not found or not authorised" }, { status: 404 });
        }
        if (job?.createdBy !== userId) {
            return NextResponse.json({ message: "You are not authorized to view this job's applicants" }, { status: 403 });
        }


        const applicants = await prisma.application.findMany({
            where: { jobId: JobId, status: { in: ['seen', 'delivered'] } },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },


                },
            },
        });

        return NextResponse.json({ message: "Job applicants fetched successfully", data: applicants });
    } catch (error) {
        console.error("Error fetching job applicants:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}

