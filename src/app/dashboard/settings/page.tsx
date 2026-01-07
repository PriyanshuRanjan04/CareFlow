"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Bell, User, Shield, Moon, Eye, Smartphone, Mail, BadgeCheck, Building2, MapPin } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-12">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase transition-colors">Clinic Settings</h1>
                <p className="text-slate-500 font-medium">Manage your professional identity and hospital environment preferences.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Profile & Hospital */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Professional Profile */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[2.5rem] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <img
                                        src={user?.imageUrl}
                                        alt="Profile"
                                        className="h-20 w-20 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-xl"
                                    />
                                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <BadgeCheck className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        {user?.fullName || "User Profile"}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 font-bold text-primary">
                                        <BadgeCheck size={16} />
                                        Verified Medical Professional
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">First Name</label>
                                    <Input defaultValue={user?.firstName || ""} className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Last Name</label>
                                    <Input defaultValue={user?.lastName || ""} className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Primary Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input disabled value={user?.primaryEmailAddress?.emailAddress || ""} className="h-12 pl-12 rounded-xl bg-slate-100/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800 text-slate-500 font-medium" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium">Email is managed via identity provider security settings.</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button className="px-8 h-12 rounded-xl font-bold bg-primary hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-none transition-all">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hospital Branding Section */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[2.5rem] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black uppercase tracking-tight">Hospital Configuration</CardTitle>
                                    <CardDescription className="font-medium">Public clinic information</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Clinic Name</label>
                                    <Input defaultValue="CareFlow Premium Center" className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Hospital Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <Input defaultValue="Medical Plaza 202, Digital Health District" className="h-12 pl-12 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Preferences & Security */}
                <div className="space-y-8">
                    {/* Appearance */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                    <Eye size={20} />
                                </div>
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Experience</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">Visual Mode</p>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sync with system</p>
                                </div>
                                <ThemeToggle />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                                    <Bell size={20} />
                                </div>
                                <CardTitle className="text-lg font-black uppercase tracking-tight">System Alerts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30">
                                <Smartphone size={18} className="text-emerald-600" />
                                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Updates</span>
                                <div className="ml-auto h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <p className="text-[10px] text-slate-400 text-center font-bold tracking-wide uppercase px-4">Instant sync enabled for clinical events</p>
                        </CardContent>
                    </Card>

                    {/* Security Info */}
                    <Card className="border-blue-100/50 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 rounded-[2.5rem] overflow-hidden border-dashed">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="group inline-flex p-4 rounded-3xl bg-white dark:bg-slate-900 shadow-lg shadow-blue-100 dark:shadow-none mb-2">
                                <Shield className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Encrypted Storage</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                Your professional data is protected with 256-bit HIPAA-aligned encryption.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
