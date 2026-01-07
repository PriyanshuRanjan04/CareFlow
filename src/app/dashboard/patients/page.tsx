import { AddPatientModal } from "@/components/dashboard/AddPatientModal";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PatientActions } from "@/components/dashboard/PatientActions";

export default async function PatientsPage() {
    const patients = await prisma.patient.findMany({
        include: {
            user: true,
        },
        orderBy: {
            user: {
                name: 'asc',
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">Manage your patient records here.</p>
                </div>
                <AddPatientModal />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Date of Birth</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No patients found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium">{patient.user.name}</TableCell>
                                        <TableCell>{patient.user.email}</TableCell>
                                        <TableCell>{patient.phoneNumber || "N/A"}</TableCell>
                                        <TableCell>{patient.gender || "N/A"}</TableCell>
                                        <TableCell>{patient.dateOfBirth ? format(new Date(patient.dateOfBirth), "PP") : "N/A"}</TableCell>
                                        <TableCell>
                                            <PatientActions patient={patient} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
