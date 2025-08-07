import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";


export async function GET() {
    const { userId } = await auth();


    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const company = await prisma.company.findMany({
            where: { userId: userId },
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

export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = await auth();

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Validate required fields
    if (!body.name || !body.description || !body.logoUrl) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await cloudinary.uploader.upload(body.logoUrl, { folder: "company_logos" })
        .then((result) => {
            body.logoUrl = result.secure_url;
        }
        ).catch((error) => {
            console.error("Error uploading logo:", error);
            return NextResponse.json({ message: "Failed to upload logo" }, { status: 500 });
        });

    try {
        const company = await prisma.company.create({
            data: {
                name: body.name,
                logoUrl: body.logoUrl,
                userId: userId,
                description: body.description,
            },
        });

        return NextResponse.json({ message: "Company created successfully", data: company });
    } catch (error) {
        console.error("Error creating company:", error);
        return NextResponse.json({ message: "Failed to create company" }, { status: 500 });
    }
}

