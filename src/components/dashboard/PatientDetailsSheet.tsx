"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { User, Patient } from "@prisma/client";

// Define a type that includes the relation
type PatientWithUser = Patient & { user: User };

interface PatientDetailsSheetProps {
    patient: PatientWithUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PatientDetailsSheet({ patient, open, onOpenChange }: PatientDetailsSheetProps) {
    if (!patient) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle>Patient Details</SheetTitle>
                    <SheetDescription>
                        View comprehensive information for {patient.user.name}.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 mb-3">Personal Information</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Full Name</dt>
                                <dd className="font-medium text-slate-900">{patient.user.name}</dd>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Email</dt>
                                <dd className="font-medium text-slate-900 truncate">{patient.user.email}</dd>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Phone</dt>
                                <dd className="font-medium text-slate-900">{patient.phoneNumber || "N/A"}</dd>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Gender</dt>
                                <dd className="font-medium text-slate-900">{patient.gender || "N/A"}</dd>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Date of Birth</dt>
                                <dd className="font-medium text-slate-900">
                                    {patient.dateOfBirth ? format(new Date(patient.dateOfBirth), "PP") : "N/A"}
                                </dd>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <dt className="text-slate-500 mb-1">Address</dt>
                                <dd className="font-medium text-slate-900 truncate">{patient.address || "N/A"}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 mb-3">Emergency Contact</h3>
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-slate-500 mb-1">Contact Name/Phone</dt>
                                    <dd className="font-medium text-slate-900">{patient.emergencyContact || "Not provided"}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500 mb-1">Blood Group</dt>
                                    <dd className="font-medium text-slate-900">{patient.bloodGroup || "Unknown"}</dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical History Placeholder */}
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 mb-3">Medical History</h3>
                        <div className="p-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center">
                            <p className="text-sm text-slate-500">No medical records found for this patient.</p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
