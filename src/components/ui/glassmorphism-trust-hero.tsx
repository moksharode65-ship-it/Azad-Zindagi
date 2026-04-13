import React from "react";
import Image from "next/image";
import { ArrowRight, Phone, Shield, Users, MapPin } from "lucide-react";

const PARTNERS = [
  "NCPCR",
  "CHILDLINE India",
  "MHA - AHTU",
  "Prayas JAC",
  "ECPAT India",
  "Shakti Vahini",
  "CBI - AHTF",
  "State DCPUs",
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

export default function HeroSection({ onDonate }: { onDonate?: () => void }) {
  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden font-sans min-h-screen transition-colors duration-500">
      <div className="absolute inset-0 z-0 bg-[url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80)] bg-cover bg-center opacity-20 dark:opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background dark:from-black/80 dark:via-black/70 dark:to-black" />

      <div className="relative z-20 bg-red-950/80 border-b border-red-400/30">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 text-center text-sm">
          <span className="font-semibold text-red-200">Child in danger? Call CHILDLINE India immediately</span>
          <a href="tel:1098" className="ml-2 inline-flex items-center gap-1 font-bold text-white underline underline-offset-2">
            <Phone className="w-4 h-4" /> 1098
          </a>
          <span className="mx-2 text-red-200/70">|</span>
          <a href="https://wa.me/919818500094" target="_blank" rel="noreferrer" className="font-semibold text-red-100 hover:text-white">
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 md:pt-28 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-orange-300 flex items-center gap-2">
                Pan-India Child Safety Initiative
                <Shield className="w-3.5 h-3.5 text-orange-400" />
              </span>
            </div>

            <div className="mb-2">
              <Image
                src="/logo.jpeg"
                alt="Azad Zindagi Foundation"
                width={120}
                height={120}
                className="w-24 h-24 md:w-32 md:h-32 object-contain mx-auto lg:mx-0"
                priority
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[1.1] md:leading-[0.9] text-center lg:text-left">
              <span className="text-foreground">Every Child Deserves</span>
              <br className="hidden md:block" />
              <span className="bg-gradient-to-br from-orange-400 via-orange-500 to-green-500 bg-clip-text text-transparent px-1">to Live Azad - Free.</span>
            </h1>

            <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center lg:text-left">
              Azad Zindagi Foundation works with government bodies, law enforcement, and NGO partners across India to prevent child trafficking, protect vulnerable children, and rehabilitate survivors into a life of dignity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDonate}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
              >
                Donate Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#programs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card/80 active:scale-95"
              >
                Explore Our Programs
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-xl shadow-2xl transition-colors duration-500">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 ring-1 ring-orange-500/30">
                    <Users className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-foreground">1,35,000+</div>
                    <div className="text-sm text-muted-foreground">Children reported missing annually (NCRB 2023)</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Child victims in trafficking</span>
                    <span className="text-foreground font-semibold">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Conviction rate in trafficking cases</span>
                    <span className="text-foreground font-semibold">&lt;1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Top source states</span>
                    <span className="text-foreground font-semibold">WB, Bihar, Jharkhand, Odisha, Rajasthan</span>
                  </div>
                </div>

                <div className="h-px w-full bg-border/50 mb-6" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="4,200+" label="Children Rescued" />
                  <StatItem value="18+" label="States Active" />
                  <StatItem value="120+" label="Partners" />
                </div>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-300">
                  <MapPin className="w-3.5 h-3.5" />
                  Nationwide prevention, rescue, and rehabilitation network
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 py-6 backdrop-blur-xl transition-colors duration-500">
              <h3 className="mb-4 px-8 text-sm font-medium text-muted-foreground">Institutional Partners</h3>
              <div className="px-8 flex flex-wrap gap-2">
                {PARTNERS.map((partner) => (
                  <span
                    key={partner}
                    className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-foreground/80 shadow-sm"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

