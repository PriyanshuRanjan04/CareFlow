import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Shield, Users, Calendar } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-100">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">CareFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/sign-in">
            Sign In
          </Link>
          <Button asChild size="sm">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-900">
                  Modern Healthcare Management <br className="hidden md:inline" />
                  <span className="text-primary">Simplified for Everyone</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl dark:text-gray-400 py-4">
                  Streamline your clinic operations, manage patient records securely, and enhance doctor-patient communication with our all-in-one system.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="px-8" asChild>
                  <Link href="/sign-up">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8" asChild>
                  <Link href="/sign-in">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-50 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Records</h3>
                <p className="text-sm text-slate-500 text-center">
                  Encrypted patient data and medical history accessible only to authorized personnel.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-50 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Smart Scheduling</h3>
                <p className="text-sm text-slate-500 text-center">
                  Automated appointment booking with real-time doctor availability and reminders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-50 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Role-Based Access</h3>
                <p className="text-sm text-slate-500 text-center">
                  Tailored interfaces for Administrators, Doctors, and Patients to ensure efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-slate-50 border-t border-slate-100">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 CareFlow. All rights reserved. Built for showcase.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 text-slate-500" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-slate-500" href="#">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
