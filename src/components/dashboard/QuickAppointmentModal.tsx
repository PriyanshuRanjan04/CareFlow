"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createAppointment } from "@/app/actions/appointment";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { Loader2, Zap } from "lucide-react";

interface QuickAppointmentModalProps {
    patients: { id: string; name: string }[];
    doctors: { id: string; name: string; department: string }[];
}

export function QuickAppointmentModal({ patients, doctors }: QuickAppointmentModalProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reason, setReason] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!patientId || !doctorId || !date || !time || !reason) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            // Combine date and time
            const dateTime = new Date(`${date}T${time}`);

            const result = await createAppointment({
                patientId,
                doctorId,
                date: dateTime,
                reason,
            });

            if (result.success) {
                toast.success("Appointment scheduled successfully");
                setOpen(false);
                // Reset form
                setPatientId("");
                setDoctorId("");
                setDate("");
                setTime("");
                setReason("");
            } else {
                toast.error(typeof result.error === 'string' ? result.error : "Failed to create appointment");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md">
                    <Zap className="mr-2 h-4 w-4" />
                    Quick Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Quick Appointment</DialogTitle>
                    <DialogDescription>
                        Schedule an appointment instantly.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="patient">Patient</Label>
                            {patientId && (
                                <button
                                    type="button"
                                    onClick={() => setPatientId("")}
                                    className="text-[10px] text-slate-400 hover:text-red-500 transition-colors underline"
                                >
                                    Remove selection
                                </button>
                            )}
                        </div>
                        <Select onValueChange={setPatientId} value={patientId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Patient" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {patients.length === 0 ? (
                                    <SelectItem value="none" disabled>No patients found</SelectItem>
                                ) : (
                                    patients.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select onValueChange={setDoctorId} value={doctorId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-y-auto">
                                {doctors.length === 0 ? (
                                    <SelectItem value="none" disabled>No doctors found</SelectItem>
                                ) : (
                                    doctors.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>
                                            <div className="flex flex-col">
                                                <span>{d.name}</span>
                                                <span className="text-[10px] text-slate-400 font-normal leading-tight">{d.department}</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <textarea
                            id="reason"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Brief description of the issue..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Schedule Appointment
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
