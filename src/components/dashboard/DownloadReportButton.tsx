"use client";

import { Button } from "@/components/ui/button";
import { generateAppointmentReport } from "@/app/actions/report";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export function DownloadReportButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const result = await generateAppointmentReport();
            if (result.success && result.csv) {
                const blob = new Blob([result.csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `appointments-report-${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                toast.success("Report downloaded successfully");
            } else {
                toast.error("Failed to generate report");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button variant="outline" onClick={handleDownload} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download Report
        </Button>
    );
}
