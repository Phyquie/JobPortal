import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const jobs = await prisma.job.findMany({
            where: {
                createdBy: userId,
            },
        });

        return NextResponse.json({ message: "Jobs fetched successfully", data: jobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
