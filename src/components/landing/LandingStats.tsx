"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { Users, UserCheck, ClipboardCheck } from "lucide-react";

interface CounterProps {
    value: number;
    label: string;
    icon: any;
    color: string;
    suffix?: string;
}

function Counter({ value, label, icon: Icon, color, suffix = "+" }: CounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            onUpdate: (latest) => setCount(Math.floor(latest)),
            ease: "easeOut",
        });
        return () => controls.stop();
    }, [value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group"
        >
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform`}>
                <Icon size={32} className={color.replace("bg-", "text-")} />
            </div>
            <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                {count}{suffix}
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest text-center">
                {label}
            </div>
        </motion.div>
    );
}

export function LandingStats({ stats }: { stats: { patients: number; doctors: number; consultations: number } }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto px-4">
            <Counter
                value={stats.patients}
                label="Registered Patients"
                icon={Users}
                color="bg-blue-600"
            />
            <Counter
                value={stats.doctors}
                label="Active Doctors"
                icon={UserCheck}
                color="bg-emerald-600"
            />
            <Counter
                value={stats.consultations}
                label="Completed Consultations"
                icon={ClipboardCheck}
                color="bg-purple-600"
            />
        </div>
    );
}
