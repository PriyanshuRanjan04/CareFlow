"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
    Activity,
    Heart,
    Shield,
    Plus,
    HeartPulse,
    Stethoscope,
    Microscope,
    Pill,
    Thermometer,
    Syringe
} from "lucide-react";
import { useEffect } from "react";

const icons = [
    { icon: Activity, color: "text-blue-400", size: 40, top: "15%", left: "10%", depth: 0.3 },
    { icon: Heart, color: "text-red-400", size: 32, top: "25%", left: "85%", depth: 0.2 },
    { icon: Shield, color: "text-emerald-400", size: 48, top: "65%", left: "15%", depth: 0.15 },
    { icon: Plus, color: "text-purple-400", size: 24, top: "80%", left: "80%", depth: 0.4 },
    { icon: HeartPulse, color: "text-blue-500", size: 36, top: "50%", left: "90%", depth: 0.25 },
    { icon: Stethoscope, color: "text-slate-400", size: 44, top: "10%", left: "70%", depth: 0.35 },
    { icon: Microscope, color: "text-indigo-400", size: 56, top: "40%", left: "5%", depth: 0.1 },
    { icon: Pill, color: "text-amber-400", size: 28, top: "85%", left: "20%", depth: 0.45 },
    { icon: Thermometer, color: "text-orange-400", size: 32, top: "70%", left: "60%", depth: 0.3 },
    { icon: Syringe, color: "text-blue-400", size: 40, top: "35%", left: "45%", depth: 0.12 },
    // New icons for more density
    { icon: Activity, color: "text-indigo-400", size: 30, top: "5%", left: "40%", depth: 0.22 },
    { icon: HeartPulse, color: "text-rose-400", size: 28, top: "45%", left: "15%", depth: 0.18 },
    { icon: Shield, color: "text-blue-300", size: 35, top: "90%", left: "50%", depth: 0.28 },
    { icon: Stethoscope, color: "text-emerald-500", size: 38, top: "75%", left: "5%", depth: 0.15 },
    { icon: Microscope, color: "text-blue-600", size: 42, top: "20%", left: "60%", depth: 0.32 },
    { icon: Pill, color: "text-violet-400", size: 22, top: "60%", left: "85%", depth: 0.4 },
    { icon: Plus, color: "text-red-600", size: 20, top: "2%", left: "20%", depth: 0.1 },
    { icon: Heart, color: "text-pink-400", size: 34, top: "82%", left: "35%", depth: 0.25 },
];



export function FloatingIcons() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) / 25;
            const y = (clientY - window.innerHeight / 2) / 25;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {icons.map((item, index) => {
                const x = useTransform(dx, (v) => v * item.depth * 5);
                const y = useTransform(dy, (v) => v * item.depth * 5);

                return (
                    <motion.div
                        key={index}
                        className={`absolute ${item.color} opacity-60 dark:opacity-40`}
                        style={{
                            top: item.top,
                            left: item.left,
                            x,
                            y
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.4, 0.6, 0.4],
                            scale: 1,
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <item.icon size={item.size + 4} />
                    </motion.div>
                );
            })}
        </div>
    );
}
