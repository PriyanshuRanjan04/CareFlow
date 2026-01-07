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
        <nav className="ml-auto flex items-center gap-4 sm:gap-8">
          <Link className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#contact">
            Contact
          </Link>
          <Button asChild size="sm" className="font-bold shadow-md shadow-blue-100">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900">
                  Modern Healthcare <br className="hidden md:inline" />
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Simplified</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl font-medium py-2">
                  Streamline clinic operations, secure patient records, and empower your medical team with CareFlow's intelligent management system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="px-10 h-14 text-lg font-bold rounded-xl shadow-xl shadow-blue-200" asChild>
                  <Link href="/sign-up">Access Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="px-10 h-14 text-lg font-bold rounded-xl border-slate-200" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Platform Features</h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium">Everything you need to run a modern, efficient healthcare facility.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 rounded-xl bg-blue-50 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Secure Records</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  HIPAA-aligned encryption for patient data and medical history, accessible only to authorized medical personnel.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Smart Scheduling</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  Automated appointment booking with real-time doctor availability and intelligent conflict resolution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 rounded-xl bg-purple-50 text-purple-600">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Role-Based Access</h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  Custom-tailored permissions for Admins, Doctors, and Patients, ensuring everyone has the tools they need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-24 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
              <div className="p-12 md:w-1/2 bg-primary text-white space-y-6">
                <h2 className="text-3xl font-bold">Contact Support</h2>
                <p className="text-blue-100">Have questions about CareFlow? Our team is here to help you get started or solve any technical issues.</p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10"><Activity className="h-5 w-5" /></div>
                    <span className="font-medium text-sm text-blue-50">Email: support@careflow.dev</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10"><Shield className="h-5 w-5" /></div>
                    <span className="font-medium text-sm text-blue-50">Availability: 24/7 Priority Support</span>
                  </div>
                </div>
              </div>
              <div className="p-12 md:w-1/2 flex flex-col justify-center space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Request a Demo</h3>
                <p className="text-slate-500 text-sm">Want to see how CareFlow can transform your clinic? Drop us a line and we'll get back to you shortly.</p>
                <Button size="lg" className="w-full rounded-xl h-12 shadow-lg shadow-blue-100">Send an Email</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 bg-white border-t border-slate-100">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-slate-500">
            © 2026 CareFlow. A state-of-the-art Healthcare Management Platform.
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
