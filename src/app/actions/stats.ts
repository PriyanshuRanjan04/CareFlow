"use server";

import prisma from "@/lib/prisma";

export async function getLandingStats() {
    try {
        const [patientCount, doctorCount, recordCount] = await Promise.all([
            prisma.patient.count(),
            prisma.doctor.count(),
            prisma.medicalRecord.count(),
        ]);

        return {
            success: true,
            stats: {
                patients: patientCount,
                doctors: doctorCount,
                consultations: recordCount,
            }
        };
    } catch (error) {
        console.error("Failed to fetch landing stats:", error);
        return {
            success: false,
            stats: {
                patients: 0,
                doctors: 0,
                consultations: 0,
            }
        };
    }
}
