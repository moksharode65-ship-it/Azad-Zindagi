import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Shield } from "lucide-react";

const PROTECTION_THREATS = [
  "Child Trafficking",
  "Child Labour And Hazardous Work",
  "Child Marriage",
  "Physical Abuse",
  "Sexual Abuse And Exploitation",
  "Emotional And Psychological Abuse",
  "Neglect And Abandonment",
  "Online Abuse And Cyber Exploitation",
  "Violence In Homes, Schools, Institutions, And Communities",
];

export default function HeroSection() {
  return (
    <div id="home" className="relative w-full bg-background text-foreground overflow-hidden font-sans min-h-screen transition-colors duration-500">
      <div className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)] bg-cover bg-center opacity-15 dark:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 dark:from-black/80 dark:via-black/50 dark:to-black/95" />

      <div className="relative z-20 bg-red-950/80 border-b border-red-400/30">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 text-center text-sm">
          <span className="font-semibold text-red-200">Child in danger? Call CHILDLINE India immediately</span>
          <a href="tel:1098" className="ml-2 inline-flex items-center gap-1 font-bold text-white underline underline-offset-2">
            <Phone className="w-4 h-4" /> 1098
          </a>
          <span className="mx-2 text-red-200/70">|</span>
          <a href="https://wa.me/919818500094" target="_blank" rel="noreferrer noopener" className="font-semibold text-red-100 hover:text-white">
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-28 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 backdrop-blur-md">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-orange-300 flex items-center gap-2">
                Right to Protection
                <Shield className="w-4 h-4 text-orange-400" />
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[0.9] text-center lg:text-left">
              <span className="text-foreground">give an Azad Zindagi to every child</span>
            </h1>

            <div className="max-w-2xl space-y-5 text-center lg:text-left">
              <p className="text-lg md:text-2xl font-medium text-muted-foreground leading-relaxed">
                <span className="block text-foreground font-semibold text-xl md:text-3xl mb-2">Safeguard innocence. Stop exploitation.</span>
                <span className="block text-base md:text-xl">Every child expects an Azad Zindagi (Free Life), and it is everyone&apos;s responsibility to make it happen.</span>
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                The Right to Protection is one of the four core rights guaranteed to every child under the UN Convention on the Rights of the Child (UNCRC) and strongly upheld in India through laws like the POCSO Act, Juvenile Justice Act, and Child Labour (Prohibition and Regulation) Act.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
              >
                Donate Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#programs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card/80 active:scale-95"
              >
                Explore Our Programs
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:mt-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-background/70 dark:bg-background/40 p-7 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-500 border border-orange-500/20 shadow-inner">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-tight">
                    A CHILD HAS THE RIGHT TO BE <span className="text-orange-600 dark:text-orange-500">PROTECTED FROM</span>
                  </h3>
                </div>
                
                <div className="grid gap-3 sm:grid-cols-2">
                  {PROTECTION_THREATS.map((threat) => (
                    <div
                      key={threat}
                      className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/90 dark:bg-background/50 px-4 py-4 text-sm md:text-base font-medium leading-snug text-muted-foreground transition-all duration-300 hover:border-orange-500/40 hover:bg-orange-500/10 dark:hover:bg-orange-500/5 hover:text-foreground hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-0.5 flex items-center"
                    >
                      <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 transition-colors group-hover:bg-orange-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500 transition-shadow duration-300 group-hover:shadow-[0_0_10px_rgba(249,115,22,1)]" />
                      </div>
                      <span className="relative z-10">{threat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

