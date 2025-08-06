import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { JobCategory, JobType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category") as JobCategory | null;
        const type = searchParams.get("type") as JobType | null;
        const search = searchParams.get("search")?.trim() || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const companyId = searchParams.get("companyId") || null;

        const filters: any = {};

        const { userId } = await auth();
        // console.log("Auth User ID:", userId);

        // console.log("User ID:", userId);


        if (search) {
            filters.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { skills: { contains: search, mode: "insensitive" } },
            ];
        }

        if (category) filters.category = category;
        if (type) filters.type = type;
        if (companyId) filters.companyId = companyId;

        const skip = (page - 1) * limit;

        // Count total documents matching filters
        const totalCount = await prisma.job.count({ where: filters });

        // Get paginated results
        const jobs = await prisma.job.findMany({
            where: filters,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                company: {
                    select: {
                        name: true,
                        logoUrl: true,
                        id: true,
                    },
                },
            },
        });

        return NextResponse.json({
            data: jobs,
            page,
            limit,
            totalCount,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
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
    if (!body.title || !body.description || !body.companyId || !body.location || !body.pin || !body.type || !body.salary || !body.category || !body.skills) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    const { title, description, companyId, location, pin, type, salary, category, skills } = body;


    try {
        const job = await prisma.job.create({
            data: {
                title,
                description,
                companyId,
                location,
                pin,
                type,
                salary,
                category,
                skills: skills,
                createdBy: userId,
            },
        });
        return NextResponse.json({ message: "Job created successfully", data: job });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ message: "Failed to create job" }, { status: 500 });
    }
}