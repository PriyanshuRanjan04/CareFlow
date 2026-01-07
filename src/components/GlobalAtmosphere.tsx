"use client";

import { EKGLine } from "./landing/EKGLine";
import { FloatingIcons } from "./landing/FloatingIcons";
import { usePathname } from "next/navigation";

export function GlobalAtmosphere() {
    const pathname = usePathname();

    // We can customize behavior based on the route if needed
    // For now, we want it everywhere

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <EKGLine />
            <FloatingIcons />
            {/* Additional global background layers can be added here */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        </div>
    );
}
