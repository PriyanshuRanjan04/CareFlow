"use client";

import { EKGLine } from "./landing/EKGLine";
import { FloatingIcons } from "./landing/FloatingIcons";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function GlobalAtmosphere() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50/30 dark:bg-slate-950/30">
            {/* Top EKG Line */}
            <div className="absolute top-1/4 left-0 w-full opacity-60">
                <EKGLine />
            </div>

            {/* Bottom EKG Line */}
            <div className="absolute bottom-1/4 left-0 w-full opacity-40">
                <EKGLine />
            </div>

            {/* Main Icon Layer */}
            <FloatingIcons />

            {/* Dynamic Gradient Atmosphere */}
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        </div>
    );
}
