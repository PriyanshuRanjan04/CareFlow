import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Plus, Search, MoreVertical } from "lucide-react";

export default async function PatientsPage() {
    // In a real app, we'd add pagination and filtering
    const patients = await prisma.patient.findMany({
        include: {
            user: true,
        },
        orderBy: {
            user: {
                name: 'asc'
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 font-tight">Patient Directory</h2>
                    <p className="text-slate-500">Manage and view all registered patients.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Register Patient
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Search patients by name, ID or email..."
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Blood Group</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <TableRow key={patient.id} className="hover:bg-slate-50/30 transition-colors">
                                    <TableCell className="font-mono text-xs text-slate-500">#{patient.id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell className="font-bold text-slate-900">{patient.user.name}</TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {patient.phoneNumber || patient.user.email}
                                    </TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded bg-red-50 text-red-700 text-xs font-bold uppercase">
                                            {patient.bloodGroup || "N/A"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {new Date(patient.user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                                    No patients found in the registry.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
