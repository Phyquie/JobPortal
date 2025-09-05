
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request) {

    try {
        const job = await prisma.job.findMany({
            orderBy: {
                salary: "desc"
            }
        });
        const maxSalary = job[0]?.salary || 0;
        return NextResponse.json({ maxSalary });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
