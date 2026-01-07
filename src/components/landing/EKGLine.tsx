"use client";

import { motion } from "framer-motion";

export function EKGLine() {
    return (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-80 pointer-events-none opacity-[0.03] dark:opacity-[0.05] overflow-hidden select-none">
            <svg
                viewBox="0 0 1000 100"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                {/* The ECG path */}
                <motion.path
                    d="M 0,50 L 100,50 L 110,40 L 120,60 L 130,50 L 250,50 L 260,20 L 270,80 L 280,50 L 400,50 L 410,45 L 420,55 L 430,50 L 550,50 L 565,10 L 580,90 L 595,50 L 750,50 L 760,40 L 770,60 L 780,50 L 900,50 L 910,20 L 920,80 L 930,50 L 1000,50"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1],
                        opacity: [0, 1, 1, 0],
                        x: [0, 1000]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Static base line */}
                <path
                    d="M 0,50 L 1000,50"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-slate-300 dark:text-slate-700"
                />
            </svg>
        </div>
    );
}
