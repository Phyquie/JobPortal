// app/api/webhook/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET || '';

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id") as string;
    const svix_timestamp = headerPayload.get("svix-timestamp") as string;
    const svix_signature = headerPayload.get("svix-signature") as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Missing Svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    interface ClerkWebhookEvent {
        data: {
            id: string;
            email_addresses: Array<{ email_address: string }>;
            first_name: string;
            last_name: string;
        };
        type: string;
    }

    let event: ClerkWebhookEvent;

    try {
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as ClerkWebhookEvent;
        console.log("Webhook event verified:", event);
    } catch (err) {
        console.log("Webhook verification failed:", err);
        return new NextResponse("Invalid signature" + err, { status: 400 });
    }

    const { id, email_addresses, first_name, last_name } = event.data;

    console.log("Processing Clerk webhook event:", {
        id,
        email_addresses,
        first_name,
        last_name,
    });

    try {
        await prisma.user.create({
            data: {
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
            },
        });
        console.log("User created in database:", {
            clerkId: id,
            email: email_addresses[0].email_address,
            firstName: first_name,
            lastName: last_name,
        });
        return new NextResponse("User created", { status: 200 });
    } catch (error) {
        console.error("DB insert error", error);
        return new NextResponse("Database error", { status: 500 });
    }
}
