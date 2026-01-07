"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Bell, Siren, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "./GlobalSearch";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";

export function DashboardHeader() {
    const handleEmergency = () => {
        toast.error("EMERGENCY PROTOCOL ACTIVATED", {
            description: "Directing all units to high alert status.",
            duration: 5000,
            icon: <Flame className="h-5 w-5 text-red-600" />,
        });
    };

    return (
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 transition-colors duration-300">
            <div className="flex items-center flex-1">
                <GlobalSearch />
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-4">
                {/* Emergency Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmergency}
                    className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full group transition-all"
                    title="EMERGENCY"
                >
                    <Siren className="h-5 w-5 animate-pulse group-hover:scale-110 transition-transform" />
                </Button>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full border-2 border-white dark:border-slate-950" />
                </Button>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                {/* User Profile */}
                <div className="pl-2">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-9 w-9 border-2 border-slate-100 dark:border-slate-800 hover:border-primary transition-colors",
                            }
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
