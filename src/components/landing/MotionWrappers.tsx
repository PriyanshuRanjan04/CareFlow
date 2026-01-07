"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}

export function GlowCard({ children, glowColor = "rgba(59, 130, 246, 0.5)" }: { children: ReactNode; glowColor?: string }) {
    return (
        <motion.div
            whileHover={{
                y: -10,
                boxShadow: `0 20px 40px -10px ${glowColor.replace("0.5", "0.15")}`,
            }}
            transition={{ duration: 0.3 }}
            className="relative h-full"
        >
            <div className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur"
                style={{ background: `linear-gradient(45deg, ${glowColor}, transparent)` }}
            ></div>
            {children}
        </motion.div>
    );
}
