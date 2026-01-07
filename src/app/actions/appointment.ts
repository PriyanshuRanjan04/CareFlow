"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { sendAppointmentEmail, sendCompletionEmail } from "@/lib/resend";
import { format } from "date-fns";

const appointmentSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    doctorId: z.string().min(1, "Doctor is required"),
    date: z.date({
        required_error: "Date is required",
    }),
    reason: z.string().min(1, "Reason is required"),
    notes: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentFormData) {
    const user = await currentUser();
    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = appointmentSchema.safeParse(data);
    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.patientId,
                doctorId: data.doctorId,
                dateTime: data.date,
                reason: data.reason,
                notes: data.notes,
                status: "PENDING",
            },
            include: {
                patient: {
                    include: {
                        user: true
                    }
                }
            }
        });

        // Trigger Email Notification via Resend
        if (appointment.patient.user.email) {
            await sendAppointmentEmail(
                appointment.patient.user.email,
                appointment.patient.user.name || "Patient",
                format(appointment.dateTime, "PPP"),
                format(appointment.dateTime, "p")
            );
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/appointments");
        return { success: true };
    } catch (error) {
        console.error("Failed to create appointment:", error);
        return { success: false, error: "Failed to create appointment" };
    }
}

const diagnosisSchema = z.object({
    appointmentId: z.string().min(1),
    patientId: z.string().min(1),
    diagnosis: z.string().min(2, "Diagnosis is required"),
    treatment: z.string().optional(),
    prescription: z.string().optional(),
});

export async function completeAppointment(data: z.infer<typeof diagnosisSchema>) {
    const user = await currentUser();
    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const result = diagnosisSchema.safeParse(data);
    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        // Fetch appointment and patient details for email notification
        const appointment = await prisma.appointment.findUnique({
            where: { id: data.appointmentId },
            include: {
                patient: {
                    include: {
                        user: true
                    }
                }
            }
        });

        await prisma.$transaction([
            // 1. Update Appointment Status
            prisma.appointment.update({
                where: { id: data.appointmentId },
                data: { status: "COMPLETED" },
            }),
            // 2. Create Medical Record
            prisma.medicalRecord.create({
                data: {
                    patientId: data.patientId,
                    diagnosis: data.diagnosis,
                    treatment: data.treatment,
                    prescription: data.prescription,
                },
            }),
        ]);

        // Trigger Completion Email
        if (appointment?.patient.user.email) {
            await sendCompletionEmail(
                appointment.patient.user.email,
                appointment.patient.user.name || "Patient",
                data.diagnosis,
                data.treatment
            );
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/appointments");
        revalidatePath("/dashboard/records");

        return { success: true };
    } catch (error) {
        console.error("Failed to complete appointment:", error);
        return { success: false, error: "Failed to save diagnosis" };
    }
}
