"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Bell, User, Shield, Moon, Eye, Smartphone } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase transition-colors">Settings</h1>
                <p className="text-slate-500 font-medium">Manage your clinical profile and dashboard preferences.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Profile Controls */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[2rem]">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                                <User size={20} />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold">User Profile</CardTitle>
                                <CardDescription className="font-medium">Update your professional information</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-6 overflow-x-auto">
                            <div className="min-w-full">
                                <UserProfile
                                    appearance={{
                                        elements: {
                                            rootBox: "w-full",
                                            card: "shadow-none border-none p-0 w-full bg-transparent",
                                            navbar: "hidden",
                                            pageScrollBox: "p-0",
                                            headerTitle: "hidden",
                                            headerSubtitle: "hidden",
                                            profileSection__profile: "pb-0",
                                            userButtonPopoverCard: "shadow-none"
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Controls */}
                <div className="space-y-8">
                    {/* Appearance */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                                    <Eye size={20} />
                                </div>
                                <CardTitle className="text-lg font-bold">Appearance</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">Interface Theme</p>
                                    <p className="text-xs text-slate-500 font-medium">Switch between light and dark</p>
                                </div>
                                <ThemeToggle />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                                    <Bell size={20} />
                                </div>
                                <CardTitle className="text-lg font-bold">Alerts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                <Smartphone size={18} className="text-slate-400" />
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Push Notifications</span>
                                <div className="ml-auto h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <p className="text-xs text-slate-500 text-center font-medium">Advanced notification settings coming in the next security patch.</p>
                        </CardContent>
                    </Card>

                    {/* Security Info */}
                    <Card className="border-blue-100 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-900/10 rounded-[2rem] overflow-hidden border-dashed">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-5 w-5 text-blue-500" />
                                <span className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider">Security Notice</span>
                            </div>
                            <p className="text-xs text-blue-700/70 dark:text-blue-300/70 font-medium leading-relaxed">
                                All profile changes are encrypted and synced across your medical network in real-time.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
