"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Loader2, Pencil } from "lucide-react";
import { User, Patient } from "@prisma/client";
import { PatientDetailsSheet } from "./PatientDetailsSheet";
import { EditPatientModal } from "./EditPatientModal";
import { deletePatient } from "@/app/actions/patient";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Define a type that includes the relation
type PatientWithUser = Patient & { user: User };

interface PatientActionsProps {
    patient: PatientWithUser;
}

export function PatientActions({ patient }: PatientActionsProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        try {
            const result = await deletePatient(patient.id);
            if (result.success) {
                toast.success("Patient deleted successfully");
                setShowDeleteDialog(false);
            } else {
                toast.error(result.error || "Failed to delete patient");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => setShowDetails(true)}
                    title="View Details"
                >
                    <Eye className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-600 hover:text-primary hover:bg-slate-50"
                    onClick={() => setShowEdit(true)}
                    title="Edit Patient"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => setShowDeleteDialog(true)}
                    title="Delete Patient"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <PatientDetailsSheet
                patient={patient}
                open={showDetails}
                onOpenChange={setShowDetails}
            />

            <EditPatientModal
                patient={patient}
                open={showEdit}
                onOpenChange={setShowEdit}
            />

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Patient</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <span className="font-semibold text-slate-900">{patient.user.name}</span>?
                            This action cannot be undone and will remove all associated data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
