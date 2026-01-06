import {
    Users,
    Calendar,
    Clock,
    TrendingUp,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
    { name: "Total Patients", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Appointments", value: "42", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Pending Approval", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Recovery Rate", value: "94.2%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-tight text-slate-900">Welcome back, Dr. Smith</h2>
                    <p className="text-slate-500">Here's what's happening at your clinic today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">Download Report</Button>
                    <Button>Add Patient</Button>
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

            {/* Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Recent Appointments
                        </h3>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-blue-50">View all</Button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-slate-50 bg-slate-50/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                        {i === 1 ? "JS" : i === 2 ? "MK" : "LW"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            {i === 1 ? "John Smith" : i === 2 ? "Maria Koric" : "Linda White"}
                                        </p>
                                        <p className="text-xs text-slate-500">General Checkup • 10:30 AM</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Details</Button>
                            </div>
                        ))}
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
