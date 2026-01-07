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


export default async function AppointmentsPage() {
    const appointments = await prisma.appointment.findMany({
        include: {
            patient: {
                include: {
                    user: true
                }
            },
            doctor: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            dateTime: 'desc'
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
                    <p className="text-muted-foreground">View and schedule appointments.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No appointments scheduled.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.map((apt) => (
                                    <TableRow key={apt.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{format(new Date(apt.dateTime), "PP")}</span>
                                                <span className="text-xs text-muted-foreground">{format(new Date(apt.dateTime), "p")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{apt.patient.user.name}</TableCell>
                                        <TableCell>{apt.doctor.user.name}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                apt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-slate-100 text-slate-800'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{apt.reason || "N/A"}</TableCell>
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
