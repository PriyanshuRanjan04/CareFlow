"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    Activity,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-900">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight dark:text-white">CareFlow</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-xl transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-blue-200 dark:shadow-none"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary dark:hover:text-primary-foreground"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <link.icon className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-white" : "group-hover:text-primary"
                                )} />
                                {link.name}
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4 text-white opacity-50" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-900">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Hospital Status</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Operational</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
