"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { sendAppointmentEmail } from "@/lib/resend";
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
