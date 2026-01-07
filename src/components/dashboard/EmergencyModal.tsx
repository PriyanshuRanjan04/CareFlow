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
            <DialogContent className="sm:max-w-lg border-red-100 dark:border-red-900 shadow-2xl p-0 overflow-hidden">
                <div className="bg-red-600 p-6 text-white flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                        <Siren className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                        <DialogTitle className="text-2xl font-black tracking-tight uppercase">Emergency Protocols</DialogTitle>
                        <p className="text-red-100 text-sm font-bold opacity-90">Medical Command Center | Indian Health Standards</p>
                    </div>
                </div>

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    {/* Medical Officer on Duty */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between group hover:border-red-500/50 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <HeartPulse className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">MO On Duty</p>
                                <p className="text-white font-bold text-lg">Dr. Rajiv Kapoor</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-500">Extension</p>
                            <p className="text-red-500 font-black text-xl">4400</p>
                        </div>
                    </div>

                    {/* Crisis Contacts - India */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/40 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-600/60 dark:text-red-400/60 flex items-center gap-2">
                                <ShieldAlert size={12} /> Police / Integrated
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">112</span>
                                <Button size="sm" variant="outline" className="h-8 rounded-lg border-red-200 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all">CALL</Button>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/40 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/60 dark:text-blue-400/60 flex items-center gap-2">
                                <Siren size={12} /> Ambulance (Emergency)
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">108 / 102</span>
                                <Button size="sm" variant="outline" className="h-8 rounded-lg border-blue-200 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all">CALL</Button>
                            </div>
                        </div>
                    </div>

                    {/* Active Hospital Codes */}
                    <div className="space-y-3 pt-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 px-1">Active Protocols</p>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                                        <Flame size={20} />
                                    </div>
                                    <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Code Red</span>
                                </div>
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">Fire Emergency</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                        <HeartPulse size={20} />
                                    </div>
                                    <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Code Blue</span>
                                </div>
                                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">Cardiac Alert</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black text-lg shadow-xl shadow-red-200 dark:shadow-none uppercase tracking-widest active:scale-95 transition-all">
                        Trigger Central Alarm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

