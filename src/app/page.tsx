import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Shield, Users, Calendar } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { FloatingIcons } from "@/components/landing/FloatingIcons";
import { EKGLine } from "@/components/landing/EKGLine";
import { ContactForm } from "@/components/landing/ContactForm";
import { LandingStats } from "@/components/landing/LandingStats";
import { Reveal, GlowCard } from "@/components/landing/MotionWrappers";
import { getLandingStats } from "@/app/actions/stats";

export default async function LandingPage() {
  const { stats } = await getLandingStats();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 overflow-x-hidden">
      <LandingHeader />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <EKGLine />
          <FloatingIcons />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <Reveal>
              <div className="flex flex-col items-center space-y-8 text-center">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900 dark:text-white leading-tight">
                    CareFlow <br className="hidden md:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 animate-gradient-x py-2 pb-4 inline-block">
                      Modern Healthcare
                    </span>
                  </h1>
                  <p className="mx-auto max-w-[800px] text-slate-500 dark:text-slate-400 md:text-xl font-medium leading-relaxed">
                    Streamline clinic operations, secure patient records, and empower your medical team with CareFlow's intelligent management system.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 mt-12">
                  <Button size="lg" className="px-10 h-14 text-lg font-bold rounded-2xl shadow-2xl shadow-blue-200 hover:scale-105 transition-all duration-300" asChild>
                    <Link href="/sign-up">Access Dashboard <ArrowRight className="ml-2 h-6 w-6" /></Link>
                  </Button>
                  <Button variant="outline" size="lg" className="px-10 h-14 text-lg font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-all duration-300" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Real-Time Stats Section */}
        <section className="w-full py-20 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6 mx-auto">
            <Reveal>
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Live Platform Health</h2>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by Medical Professionals</p>
              </div>
              <LandingStats stats={stats} />
            </Reveal>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white dark:from-slate-950 to-transparent"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Platform Features</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-medium">Everything you need to run a modern, efficient healthcare facility.</p>
              </div>
            </Reveal>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal delay={0.1}>
                <GlowCard glowColor="rgba(59, 130, 246, 0.5)">
                  <div className="group flex flex-col items-center space-y-6 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 h-full relative z-10">
                    <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Shield className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Secure Records</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed font-medium">
                      HIPAA-aligned encryption for patient data and medical history, accessible only to authorized medical personnel.
                    </p>
                  </div>
                </GlowCard>
              </Reveal>

              <Reveal delay={0.2}>
                <GlowCard glowColor="rgba(16, 185, 129, 0.5)">
                  <div className="group flex flex-col items-center space-y-6 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 h-full relative z-10">
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Calendar className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart Scheduling</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed font-medium">
                      Automated appointment booking with real-time doctor availability and intelligent conflict resolution.
                    </p>
                  </div>
                </GlowCard>
              </Reveal>

              <Reveal delay={0.3}>
                <GlowCard glowColor="rgba(147, 51, 234, 0.5)">
                  <div className="group flex flex-col items-center space-y-6 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 h-full relative z-10">
                    <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                      <Users className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Role-Based Access</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed font-medium">
                      Custom-tailored permissions for Admins, Doctors, and Patients, ensuring everyone has the tools they need.
                    </p>
                  </div>
                </GlowCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6 mx-auto">
            <Reveal>
              <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-slate-900 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Left Side: Support Info */}
                <div className="p-8 md:p-16 md:w-1/2 bg-blue-600 text-white space-y-8 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity size={200} />
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Contact Support</h2>
                  <p className="text-blue-100 text-base font-medium leading-relaxed">
                    Have questions about CareFlow? Our dedicated team is here to help you get started or solve any technical issues you might face.
                  </p>
                  <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-4 group/item cursor-default">
                      <div className="p-3 rounded-xl bg-white/10 group-hover/item:bg-white/20 transition-colors">
                        <Activity className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-blue-50">support@careflow.dev</span>
                    </div>
                    <div className="flex items-center gap-4 group/item cursor-default">
                      <div className="p-3 rounded-xl bg-white/10 group-hover/item:bg-white/20 transition-colors">
                        <Shield className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-blue-50">24/7 Priority Support</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Demo Form */}
                <div className="p-8 md:p-16 md:w-1/2 flex flex-col justify-center space-y-8 bg-slate-900 relative">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">Request a Demo</h3>
                    <p className="text-slate-400 text-base font-medium">Ready to see how CareFlow can transform your medical facility's workflow?</p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <p className="text-base font-bold text-slate-900 dark:text-white">
              © 2026 CareFlow. All rights reserved.
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              A state-of-the-art Healthcare Management Platform.
            </p>
          </div>
          <nav className="flex gap-8">
            <Link className="text-sm font-bold text-slate-400 dark:text-slate-300 hover:text-primary transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm font-bold text-slate-400 dark:text-slate-300 hover:text-primary transition-colors" href="#">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

