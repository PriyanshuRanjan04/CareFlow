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
import { CompleteAppointmentModal } from "@/components/dashboard/CompleteAppointmentModal";

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
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-tight">Appointments</h2>
                    <p className="text-slate-500">View and manage scheduled clinical sessions.</p>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-200">
                    <CardTitle className="text-lg font-bold text-slate-800">Appointment Ledger</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                                <TableHead className="font-bold text-slate-700">Date & Time</TableHead>
                                <TableHead className="font-bold text-slate-700">Patient</TableHead>
                                <TableHead className="font-bold text-slate-700">Doctor</TableHead>
                                <TableHead className="font-bold text-slate-700">Status</TableHead>
                                <TableHead className="font-bold text-slate-700">Reason</TableHead>
                                <TableHead className="text-right font-bold text-slate-700 pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-48 text-slate-400 italic">
                                        No appointments scheduled in the system.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.map((apt) => (
                                    <TableRow key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">{format(new Date(apt.dateTime), "PP")}</span>
                                                <span className="text-xs text-slate-500">{format(new Date(apt.dateTime), "p")}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700">{apt.patient.user.name}</TableCell>
                                        <TableCell className="font-medium text-slate-700">{apt.doctor.user.name}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors ${apt.status === 'COMPLETED'
                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                    : apt.status === 'CANCELLED'
                                                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-slate-600 italic">
                                            "{apt.reason || "N/A"}"
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            {apt.status === 'PENDING' && (
                                                <CompleteAppointmentModal
                                                    appointmentId={apt.id}
                                                    patientId={apt.patient.id}
                                                    patientName={apt.patient.user.name || "Patient"}
                                                />
                                            )}
                                            {apt.status === 'COMPLETED' && (
                                                <span className="text-xs text-slate-400 font-medium italic">Record Saved</span>
                                            )}
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
