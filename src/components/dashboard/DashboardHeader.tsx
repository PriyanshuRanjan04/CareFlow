"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { GlobalSearch } from "./GlobalSearch";
import { ThemeToggle } from "./ThemeToggle";
import { EmergencyModal } from "./EmergencyModal";
import { NotificationPopover } from "./NotificationPopover";

export function DashboardHeader() {
    return (
        <header className="h-16 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 transition-colors duration-300">
            <div className="flex items-center flex-1">
                <GlobalSearch />
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-4">
                {/* Emergency Button */}
                <EmergencyModal />

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <NotificationPopover />

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
