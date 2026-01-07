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
    { icon: Activity, color: "text-blue-200", size: 40, top: "15%", left: "10%", depth: 0.2 },
    { icon: Heart, color: "text-red-100", size: 32, top: "25%", left: "85%", depth: 0.15 },
    { icon: Shield, color: "text-emerald-100", size: 48, top: "65%", left: "15%", depth: 0.1 },
    { icon: Plus, color: "text-purple-100", size: 24, top: "80%", left: "80%", depth: 0.25 },
    { icon: HeartPulse, color: "text-blue-100", size: 36, top: "50%", left: "90%", depth: 0.12 },
    { icon: Stethoscope, color: "text-slate-200", size: 44, top: "10%", left: "70%", depth: 0.18 },
    { icon: Microscope, color: "text-indigo-100", size: 56, top: "40%", left: "5%", depth: 0.08 },
    { icon: Pill, color: "text-amber-100", size: 28, top: "85%", left: "20%", depth: 0.3 },
    { icon: Thermometer, color: "text-orange-100", size: 32, top: "70%", left: "60%", depth: 0.22 },
    { icon: Syringe, color: "text-blue-100", size: 40, top: "35%", left: "45%", depth: 0.05 },
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
