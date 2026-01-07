"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function searchHealthcare(query: string) {
    if (!query || query.length < 2) return { success: true, results: [] };

    try {
        const user = await currentUser();
        if (!user) return { success: false, error: "Unauthorized" };

        const [patients, doctors] = await Promise.all([
            prisma.patient.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                    ],
                },
                take: 5,
                include: { user: true }
            }),
            prisma.doctor.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { bio: { contains: query, mode: "insensitive" } }, // 'bio' is currently used for 'department'
                    ],
                },
                take: 5,
                include: { user: true }
            })
        ]);

        return {
            success: true,
            results: [
                ...patients.map(p => ({ id: p.id, name: p.name, type: "Patient", href: `/dashboard/patients` })),
                ...doctors.map(d => ({ id: d.id, name: d.name, type: "Doctor", href: `/dashboard/doctors` }))
            ]
        };
    } catch (error) {
        console.error("Search error:", error);
        return { success: false, error: "Search failed" };
    }
}
