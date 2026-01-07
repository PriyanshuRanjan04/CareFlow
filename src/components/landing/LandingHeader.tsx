"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LandingHeader() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-6 h-16 flex items-center",
                isScrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
                    : "bg-transparent border-b border-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <Link className="flex items-center justify-center gap-2" href="/">
                <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="p-1.5 rounded-lg bg-primary/10"
                >
                    <Activity className="h-6 w-6 text-primary" />
                </motion.div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">CareFlow</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-8">
                <Link className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors relative group" href="#features">
                    Features
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors relative group" href="#contact">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Button asChild size="sm" className="font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all rounded-xl">
                    <Link href="/sign-up">Get Started</Link>
                </Button>
            </nav>
        </motion.header>
    );
}
