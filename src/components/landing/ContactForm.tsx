"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleInquiry } from "@/app/actions/inquiry";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
    const [pending, setPending] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await handleInquiry(formData);
            if (result.success) {
                toast.success(result.message);
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto md:mx-0">
            <div className="space-y-2">
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your work email"
                    required
                    className="h-12 rounded-xl bg-white/5 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500 transition-all"
                />
            </div>
            <div className="space-y-2">
                <Textarea
                    name="message"
                    placeholder="Tell us about your facility (Optional)"
                    className="min-h-[100px] rounded-xl bg-white/5 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500 transition-all resize-none"
                />
            </div>
            <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
            >
                {pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Inquiry Now
                        <Send className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
            <p className="text-[10px] text-center md:text-left text-slate-500 font-medium">
                By clicking, you agree to our privacy policy.
            </p>
        </form>
    );
}
