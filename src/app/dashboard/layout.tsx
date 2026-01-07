import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    PlusCircle,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SyncUser } from "@/components/dashboard/SyncUser";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50/50">
            <SyncUser />
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg tracking-tight">CareFlow</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 hover:text-primary transition-all group"
                        >
                            <link.icon className="h-4 w-4 group-hover:text-primary" />
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                        <PlusCircle className="h-4 w-4" />
                        Quick Appointment
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                {/* Dashboard Body */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
