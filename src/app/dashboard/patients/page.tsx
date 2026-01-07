import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function PatientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">Manage your patient records here.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Patient
                </Button>
            </div>
            <div className="flex items-center justify-center h-64 border rounded-lg bg-slate-50 border-slate-200 border-dashed">
                <p className="text-muted-foreground">Patient list implementation coming soon.</p>
            </div>
        </div>
    );
}
