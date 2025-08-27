import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const userId = id

    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    try {
        const userProfile = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!userProfile) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User profile fetched successfully", data: userProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { userId } = await auth();
    const body = await request.json();
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });



    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    if (id != userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    }

    await cloudinary.uploader.upload(body.savedResumeUrl, { folder: "saved_resume" })
        .then((result) => {
            body.savedResumeUrl = result.secure_url;
        }
        ).catch((error) => {
            console.error("Error uploading resume:", error);
            return NextResponse.json({ message: "Failed to upload resume" }, { status: 500 });
        });


    try {
        const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                savedResumeUrl: body.savedResumeUrl,
            },
        });

        return NextResponse.json({ message: "User profile updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

