"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";

export async function generateAppointmentReport() {
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: { include: { user: true } },
                doctor: { include: { user: true } }
            },
            orderBy: { dateTime: 'desc' },
            take: 100 // Limit to last 100 for performance in this demo
        });

        const header = "Date,Time,Patient Name,Doctor Name,Status,Reason\n";
        const rows = appointments.map(app => {
            const date = format(new Date(app.dateTime), "yyyy-MM-dd");
            const time = format(new Date(app.dateTime), "HH:mm");
            const patientName = app.patient.user.name || "Unknown";
            const doctorName = app.doctor.user.name || "Unknown";
            const reason = app.reason || "N/A";

            // Escape commas in CSV
            const sanitize = (str: string) => `"${str.replace(/"/g, '""')}"`;

            return `${date},${time},${sanitize(patientName)},${sanitize(doctorName)},${app.status},${sanitize(reason)}`;
        }).join("\n");

        return { success: true, csv: header + rows };
    } catch (error) {
        console.error("Report generation failed:", error);
        return { success: false, error: "Failed to generate report" };
    }
}
