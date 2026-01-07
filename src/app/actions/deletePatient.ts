"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function deletePatient(patientId: string) {
    const user = await currentUser();
    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Delete related records first if not handled by cascade delete in schema
        // Prisma schema usually handles cascade if configured, but good to be safe or explicit
        // Current schema: Patient -> Appointments, MedicalRecords
        // We'll trust Prisma Cascade if set, or delete manually.
        // Let's rely on `delete` which will fail if relations exist without cascade, 
        // BUT we will wrap in transaction to be safe if we need manual cleanup later.
        // For now, simple delete.

        await prisma.patient.delete({
            where: {
                id: patientId,
            },
        });

        revalidatePath("/dashboard/patients");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete patient:", error);
        return { success: false, error: "Failed to delete patient" };
    }
}
