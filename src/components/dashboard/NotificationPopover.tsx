"use client";

import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, FileText, UserPlus, Info } from "lucide-react";
import { format } from "date-fns";

const notifications = [
    {
        id: 1,
        title: "New Patient Registered",
        description: "Priyanshu Ranjan just completed onboarding.",
        time: new Date(),
        icon: UserPlus,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        id: 2,
        title: "Appointment Reminder",
        description: "Surgery scheduled with Dr. Smith in 2 hours.",
        time: new Date(Date.now() - 3600000),
        icon: Calendar,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        id: 3,
        title: "Record Updated",
        description: "Lab results for Patient #442 are now available.",
        time: new Date(Date.now() - 7200000),
        icon: FileText,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
];

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative group transition-all"
                >
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-primary rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 rounded-2xl border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Notifications</h4>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-slate-50 dark:border-slate-900/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer group">
                            <div className="flex gap-4">
                                <div className={`h-10 w-10 shrink-0 rounded-xl ${n.bg} dark:bg-opacity-10 flex items-center justify-center ${n.color}`}>
                                    <n.icon size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{n.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{n.description}</p>
                                    <p className="text-[10px] font-medium text-slate-400">{format(n.time, "h:mm a")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-white dark:bg-slate-950 text-center">
                    <Button variant="ghost" size="sm" className="w-full text-xs font-bold text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10">
                        View All Activity
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
