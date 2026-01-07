"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { GlobalSearch } from "./GlobalSearch";
import { ThemeToggle } from "./ThemeToggle";
import { EmergencyModal } from "./EmergencyModal";
import { NotificationPopover } from "./NotificationPopover";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
    return (
        <header className="h-16 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0 transition-colors duration-300">
            <div className="flex items-center gap-4 flex-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-r-slate-200 dark:border-r-slate-800">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
                <div className="flex-1 max-w-sm">
                    <GlobalSearch />
                </div>
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
