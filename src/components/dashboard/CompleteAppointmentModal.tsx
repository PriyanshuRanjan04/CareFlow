"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { completeAppointment } from "@/app/actions/appointment";
import { toast } from "sonner";
import { Loader2, ClipboardCheck } from "lucide-react";

const formSchema = z.object({
    diagnosis: z.string().min(2, "Diagnosis is required"),
    treatment: z.string().optional(),
    prescription: z.string().optional(),
});

interface CompleteAppointmentModalProps {
    appointmentId: string;
    patientId: string;
    patientName: string;
}

export function CompleteAppointmentModal({ appointmentId, patientId, patientName }: CompleteAppointmentModalProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            diagnosis: "",
            treatment: "",
            prescription: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const result = await completeAppointment({
                ...values,
                appointmentId,
                patientId,
            });

            if (result.success) {
                toast.success("Appointment completed and record created");
                setOpen(false);
                form.reset();
            } else {
                toast.error("Failed to process diagnosis");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Diagnose
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Diagnosis - {patientName}</DialogTitle>
                    <DialogDescription>
                        Complete the session by providing diagnosis and treatment details.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="diagnosis"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diagnosis</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. Acute Viral Fever"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="treatment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Treatment Plan</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. Bed rest for 3 days, increased fluid intake"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="prescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prescription</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Paracetamol 500mg (1-0-1)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Complete & Save Record
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
