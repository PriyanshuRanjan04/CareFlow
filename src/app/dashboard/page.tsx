import {
    Users,
    Calendar,
    Clock,
    TrendingUp,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Link from "next/link";
import { AddPatientModal } from "@/components/dashboard/AddPatientModal";

import { QuickAppointmentModal } from "@/components/dashboard/QuickAppointmentModal";
import { AddDoctorModal } from "@/components/dashboard/AddDoctorModal";

export default async function DashboardPage() {
    const user = await currentUser();

    const [patientCount, appointmentCount, pendingCount, recentAppointments, patients, doctors] = await Promise.all([
        prisma.patient.count(),
        prisma.appointment.count(),
        prisma.appointment.count({
            where: { status: 'PENDING' }
        }),
        prisma.appointment.findMany({
            take: 3,
            orderBy: {
                dateTime: 'desc'
            },
            include: {
                patient: {
                    include: {
                        user: true
                    }
                }
            }
        }),
        prisma.patient.findMany({
            include: { user: true },
            take: 50,
        }),
        prisma.doctor.findMany({
            include: { user: true },
            take: 10,
        })
    ]);

    const stats = [
        { name: "Total Patients", value: patientCount.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Total Appointments", value: appointmentCount.toString(), icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
        { name: "Pending Approval", value: pendingCount.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { name: "Recovery Rate", value: "94.2%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    // Format data for modal
    const patientsList = patients.map(p => ({ id: p.id, name: p.user.name || "Unknown Patient" }));
    const doctorsList = doctors.map(d => ({
        id: d.id,
        name: d.user.name || "Dr. Unknown",
        department: d.bio || "General"
    }));

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-tight text-slate-900">
                        Welcome back, {user?.firstName || "Doctor"}
                    </h2>
                    <p className="text-slate-500">Here's what's happening at your clinic today.</p>
                </div>

                <div className="flex items-center gap-3">
                    <QuickAppointmentModal patients={patientsList} doctors={doctorsList} />
                    <AddDoctorModal />
                    <AddPatientModal />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                        </div>
                    </div>
                ))}
            </div>

// Activity Section
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Recent Appointments
                        </h3>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50" asChild>
                            <Link href="/dashboard/appointments">View all</Link>
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {recentAppointments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
                                <Calendar className="h-8 w-8 text-slate-200 mb-2" />
                                <p className="text-slate-400 text-sm italic">No clinical sessions scheduled yet.</p>
                            </div>
                        ) : (
                            recentAppointments.map((appointment) => (
                                <div key={appointment.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/50 hover:shadow-md hover:shadow-slate-100 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                                            {appointment.patient.user.name?.substring(0, 2).toUpperCase() || "PT"}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-slate-900">
                                                    {appointment.patient.user.name || "Unknown Patient"}
                                                </p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${appointment.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium">
                                                {format(new Date(appointment.dateTime), "MMM d, h:mm a")} • <span className="italic text-slate-400">"{appointment.reason || "General Checkup"}"</span>
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-primary" asChild>
                                        <Link href="/dashboard/appointments">Details</Link>
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-blue-200">
                    <h3 className="text-lg font-bold mb-4">Quick Diagnosis Tip</h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-6">
                        Always double-check patient history before prescribing antibiotics to ensure there are no previously recorded allergies.
                    </p>
                    <div className="p-4 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm">
                        <p className="text-xs uppercase tracking-wider font-bold opacity-80 mb-2">Upcoming Reminder</p>
                        <p className="text-sm font-medium italic">Weekly Staff Meeting at 2:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
