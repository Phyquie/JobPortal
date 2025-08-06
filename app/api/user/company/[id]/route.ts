import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { userId } = await auth();
    const companyId = params.id;

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            return NextResponse.json({ message: "Company not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Company fetched successfully", data: company });
    } catch (error) {
        console.error("Error fetching company:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const jobId = params.id;
    if (!jobId) {
        return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    // Validate required fields
    if (!body.name || !body.description || !body.logoUrl) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const company = await prisma.company.update({
            where: { id: jobId, userId: userId },
            data: {
                name: body.name,
                logoUrl: body.logoUrl,
            },
        });

        return NextResponse.json({ message: "Company updated successfully", data: company });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update company" }, { status: 500 });
    }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { userId } = await auth();
    const jobId = params.id;

    if (!jobId) {
        return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const company = await prisma.company.delete({
            where: { userId: userId, id: jobId },
        });

        return NextResponse.json({ message: "Company deleted successfully", data: company });
    } catch (error) {
        console.error("Error deleting company:", error);
        return NextResponse.json({ message: "Failed to delete company" }, { status: 500 });
    }
}

