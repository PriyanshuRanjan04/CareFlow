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

export default async function RecordsPage() {
    const records = await prisma.medicalRecord.findMany({
        include: {
            patient: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            date: 'desc'
        }
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Medical Records</h2>
                <p className="text-muted-foreground">Access patient medical history and documents.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Medical Records</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Diagnosis</TableHead>
                                <TableHead>Treatment</TableHead>
                                <TableHead>Prescription</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {records.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No medical records found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                records.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{format(new Date(record.date), "PP")}</TableCell>
                                        <TableCell className="font-medium">{record.patient.user.name}</TableCell>
                                        <TableCell>{record.diagnosis}</TableCell>
                                        <TableCell>{record.treatment || "N/A"}</TableCell>
                                        <TableCell>{record.prescription || "N/A"}</TableCell>
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
