"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function GlobalSearch() {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }, []);

    return (
        <div className="relative w-full max-w-sm hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
                placeholder="Search anything..."
                className="pl-10 pr-12 h-10 w-full bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus-visible:ring-primary/20 transition-all font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
                </kbd>
            </div>
        </div>
    );
}
