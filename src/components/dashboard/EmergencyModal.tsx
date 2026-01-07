"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Siren, Phone, ShieldAlert, Zap, Flame, HeartPulse } from "lucide-react";

export function EmergencyModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full group transition-all"
                    title="EMERGENCY"
                >
                    <Siren className="h-5 w-5 animate-pulse group-hover:scale-110 transition-transform" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-red-100 dark:border-red-900 shadow-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Siren className="h-6 w-6 text-red-600" />
                        </div>
                        <DialogTitle className="text-2xl font-black text-red-600 tracking-tight">Emergency Protocols</DialogTitle>
                    </div>
                    <DialogDescription className="font-medium text-slate-500">
                        Immediate actions and critical contacts for hospital emergencies.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Critical Contacts */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Line</p>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Phone size={14} /> 108 / 112
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trauma Unit</p>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <ShieldAlert size={14} /> EXT: 911
                            </div>
                        </div>
                    </div>

                    {/* Hospital Codes */}
                    <div className="space-y-3">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Active Hospital Codes</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
                                <div className="flex items-center gap-3 font-bold text-red-700 dark:text-red-400">
                                    <Flame size={18} /> Code Red
                                </div>
                                <span className="text-[10px] font-black uppercase text-red-600/60">Fire / Smoke</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                                <div className="flex items-center gap-3 font-bold text-blue-700 dark:text-blue-400">
                                    <HeartPulse size={18} /> Code Blue
                                </div>
                                <span className="text-[10px] font-black uppercase text-blue-600/60">Cardiac Arrest</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                                <div className="flex items-center gap-3 font-bold text-amber-700 dark:text-amber-400">
                                    <Zap size={18} /> Code Yellow
                                </div>
                                <span className="text-[10px] font-black uppercase text-amber-600/60">System Failure</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 font-bold shadow-lg shadow-red-200 dark:shadow-none">
                        TRIGGER ALERT TO ALL UNITS
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
