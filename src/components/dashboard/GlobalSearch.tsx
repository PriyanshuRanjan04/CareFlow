"use client";

import { Search, User, Activity, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { searchHealthcare } from "@/app/actions/search";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function GlobalSearch() {
    const [isMac, setIsMac] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                document.getElementById("global-search-input")?.focus();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setLoading(true);
            setIsOpen(true);
            const res = await searchHealthcare(query);
            if (res.success) {
                setResults(res.results || []);
            }
            setLoading(false);
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="relative w-full max-w-sm hidden lg:block" ref={dropdownRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
                id="global-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.length >= 2 && setIsOpen(true)}
                placeholder="Search patients, doctors..."
                className="pl-10 pr-12 h-10 w-full bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl focus-visible:ring-primary/20 transition-all font-medium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {query ? (
                    <button onClick={() => setQuery("")} className="hover:text-slate-600 transition-colors">
                        <X className="h-4 w-4 text-slate-400" />
                    </button>
                ) : (
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100 dark:border-slate-800 dark:bg-slate-950">
                        <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
                    </kbd>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-1">
                                {results.map((result) => (
                                    <button
                                        key={`${result.type}-${result.id}`}
                                        onClick={() => {
                                            router.push(result.href);
                                            setIsOpen(false);
                                            setQuery("");
                                        }}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors text-left group"
                                    >
                                        <div className={cn(
                                            "p-2 rounded-lg",
                                            result.type === "Patient" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                                        )}>
                                            {result.type === "Patient" ? <User size={18} /> : <Activity size={18} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{result.name}</p>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{result.type}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-sm font-medium text-slate-500">No results found for "{query}"</p>
                            </div>
                        )}
                    </div>
                    {results.length > 0 && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>{results.length} results</span>
                            <span>Esc to close</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
