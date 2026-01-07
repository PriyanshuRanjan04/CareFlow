'use server'

import { z } from "zod";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const doctorSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    specialization: z.string().min(2, "Specialization is required"),
    licenseNumber: z.string().min(5, "License number is required"),
    bio: z.string().optional(),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;

export async function createDoctor(data: DoctorFormData) {
    const user = await currentUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = doctorSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        // Check if user already exists
        let doctorUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!doctorUser) {
            // Create a dummy Clerk ID for now
            doctorUser = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    clerkId: `generated_doc_${Date.now()}`,
                    role: "DOCTOR"
                }
            })
        } else {
            // If user exists, ensure they have the DOCTOR role
            await prisma.user.update({
                where: { id: doctorUser.id },
                data: { role: "DOCTOR" }
            });
        }

        const newDoctor = await prisma.doctor.create({
            data: {
                userId: doctorUser.id,
                specialization: data.specialization,
                licenseNumber: data.licenseNumber,
                bio: data.bio || "",
            }
        });

        revalidatePath("/dashboard");
        return { success: true, doctor: newDoctor };

    } catch (error) {
        console.error("Failed to create doctor:", error);
        // Handle unique constraint violation for licenseNumber
        if ((error as any).code === 'P2002') {
            return { success: false, error: "License number already exists" };
        }
        return { success: false, error: "Failed to create doctor" };
    }
}
