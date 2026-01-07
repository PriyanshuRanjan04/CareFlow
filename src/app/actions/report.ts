"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";

export async function generatePatientReport() {
    const user = await currentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    try {
        const patients = await prisma.patient.findMany({
            include: { user: true },
            orderBy: { user: { name: 'asc' } }
        });

        const header = "Name,Email,Phone,Gender,Date of Birth,Address\n";
        const rows = patients.map(p => {
            const name = p.user.name || "Unknown";
            const email = p.user.email || "N/A";
            const phone = p.phoneNumber || "N/A";
            const gender = p.gender || "N/A";
            const dob = p.dateOfBirth ? format(new Date(p.dateOfBirth), "yyyy-MM-dd") : "N/A";
            const address = p.address || "N/A";

            // Escape commas in CSV
            const sanitize = (str: string) => `"${str.replace(/"/g, '""')}"`;

            return `${sanitize(name)},${sanitize(email)},${sanitize(phone)},${gender},${dob},${sanitize(address)}`;
        }).join("\n");

        return { success: true, csv: header + rows };
    } catch (error) {
        console.error("Patient report generation failed:", error);
        return { success: false, error: "Failed to generate report" };
    }
}

