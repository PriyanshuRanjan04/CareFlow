import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Check Env Vars availability (Don't reveal values, just presence)
        const checkVars = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            DIRECT_URL: !!process.env.DIRECT_URL,
            CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        };

        // 2. Test Connection
        const userCount = await prisma.user.count();

        return NextResponse.json({
            status: "Success",
            message: "Connected to Database correctly!",
            userCount,
            envCheck: checkVars,
            databaseUrlDetails: {
                // Show only the start of the URL to verify protocol/host without revealing password
                starts_with: process.env.DATABASE_URL?.substring(0, 25) + "...",
                contains_pgbouncer: process.env.DATABASE_URL?.includes("pgbouncer=true"),
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error("Debug Route Error:", error);
        return NextResponse.json({
            status: "Error",
            message: error.message,
            stack: error.stack,
            envCheck: {
                DATABASE_URL: !!process.env.DATABASE_URL,
            }
        }, { status: 500 });
    }
}
