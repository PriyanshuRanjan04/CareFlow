"use client";

import { motion } from "framer-motion";
import { Activity, Heart, Shield, Plus, HeartPulse } from "lucide-react";

const icons = [
    { icon: Activity, color: "text-blue-200", size: 40, top: "15%", left: "10%", delay: 0 },
    { icon: Heart, color: "text-red-100", size: 32, top: "25%", left: "85%", delay: 1 },
    { icon: Shield, color: "text-emerald-100", size: 48, top: "65%", left: "15%", delay: 2 },
    { icon: Plus, color: "text-purple-100", size: 24, top: "80%", left: "80%", delay: 0.5 },
    { icon: HeartPulse, color: "text-blue-100", size: 36, top: "50%", left: "90%", delay: 1.5 },
];

export function FloatingIcons() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${item.color} opacity-60`}
                    style={{ top: item.top, left: item.left }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        delay: item.delay,
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <item.icon size={item.size} />
                </motion.div>
            ))}
        </div>
    );
}
