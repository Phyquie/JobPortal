import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { ApplicationStatus } from "@prisma/client";

export async function POST(request: Request) {
    const { userId } = await auth();
    const body = await request.json();
    const { resumeUrl, coverLetter, JobId } = body;
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const existingApplication = await prisma.application.findFirst({
            where: {
                jobId: JobId,
                userId: userId,
            },
        });
        if (existingApplication) {
            return NextResponse.json({ message: "You have already applied for this job" }, { status: 400 });
        }
        const application = await prisma.application.create({
            data: {
                jobId: JobId,
                userId: userId,
                status: "delivered",
                resumeUrl: resumeUrl,
                coverLetter: coverLetter,
            },
        });
        return NextResponse.json({ message: "Application submitted successfully", data: application }, { status: 201 });
    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const applications = await prisma.application.findMany({
            where: {
                userId: userId,
            },
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        company: {
                            select: {
                                name: true,
                                logoUrl: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!applications.length) {
            return NextResponse.json({ message: "No applications found for this user" }, { status: 404 });
        }
        return NextResponse.json({ message: "Applications fetched successfully", data: applications }, { status: 200 });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

