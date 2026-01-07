'use server'

import { z } from "zod";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const patientSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    gender: z.enum(["Male", "Female", "Other"]),
    dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: "A valid date of birth is required.",
    }),
    address: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export async function createPatient(data: PatientFormData) {
    const user = await currentUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = patientSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        // Create a user record for the patient first (since Patient has a relation to User)
        // In a real app, you might want a different flow, but for this schema:
        // Patient -> User (relation)

        // Check if user already exists
        let patientUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!patientUser) {
            // Create a dummy Clerk ID for now since this is an internal add
            // In production, you'd invite the user via Clerk
            patientUser = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    clerkId: `generated_${Date.now()}`,
                    role: "PATIENT"
                }
            })
        }

        const newPatient = await prisma.patient.create({
            data: {
                userId: patientUser.id,
                gender: data.gender,
                phoneNumber: data.phone,
                dateOfBirth: new Date(data.dob),
                address: data.address || "",
            }
        });

        revalidatePath("/dashboard");
        return { success: true, patient: newPatient };

    } catch (error) {
        console.error("Failed to create patient:", error);
        return { success: false, error: "Failed to create patient" };
    }
}
