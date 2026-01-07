'use server'

import { z } from "zod";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const patientFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    gender: z.enum(["Male", "Female", "Other"]),
    dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
        message: "A valid date of birth is required.",
    }),
    address: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

export async function createPatient(data: PatientFormData) {
    const user = await currentUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = patientFormSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        let patientUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!patientUser) {
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
        revalidatePath("/dashboard/patients");
        return { success: true, patient: newPatient };

    } catch (error) {
        console.error("Failed to create patient:", error);
        return { success: false, error: "Failed to create patient" };
    }
}

export async function updatePatient(id: string, data: PatientFormData) {
    const user = await currentUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = patientFormSchema.safeParse(data);

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        // Update both User (Name/Email) and Patient records
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!patient) {
            return { success: false, error: "Patient not found" };
        }

        await prisma.$transaction([
            prisma.user.update({
                where: { id: patient.userId },
                data: {
                    name: data.name,
                    email: data.email,
                }
            }),
            prisma.patient.update({
                where: { id },
                data: {
                    gender: data.gender,
                    phoneNumber: data.phone,
                    dateOfBirth: new Date(data.dob),
                    address: data.address || "",
                }
            })
        ]);

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/patients");
        return { success: true };

    } catch (error) {
        console.error("Failed to update patient:", error);
        return { success: false, error: "Failed to update patient" };
    }
}

export async function deletePatient(patientId: string) {
    const user = await currentUser();
    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.$transaction([
            // 1. Delete related Medical Records
            prisma.medicalRecord.deleteMany({
                where: { patientId },
            }),
            // 2. Delete related Appointments
            prisma.appointment.deleteMany({
                where: { patientId },
            }),
            // 3. Delete the Patient record
            prisma.patient.delete({
                where: { id: patientId },
            }),
        ]);

        revalidatePath("/dashboard/patients");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete patient:", error);
        return { success: false, error: "Failed to delete patient" };
    }
}
