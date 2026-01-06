"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

export async function syncUser() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await currentUser();
    if (!user) return null;

    // Check if user already exists in Prisma
    const existingUser = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (existingUser) return existingUser;

    // Create new user in Prisma
    const newUser = await prisma.user.create({
        data: {
            clerkId: userId,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            role: UserRole.PATIENT, // Default role
        },
    });

    // If PATIENT, create a patient profile automatically
    await prisma.patient.create({
        data: {
            userId: newUser.id,
        },
    });

    return newUser;
}

export async function getUserRole() {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { role: true },
    });

    return user?.role || null;
}
