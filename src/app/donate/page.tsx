"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Heart, ShieldCheck, Smartphone, CheckCircle2, Landmark } from "lucide-react";

const UPI_ID = "Vyapar.175694275498@hdfcbank";
const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const finalAmount = useMemo(() => {
    const parsed = Number(customAmount);
    return customAmount.trim() ? parsed : amount;
  }, [amount, customAmount]);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-green-600/8 blur-[100px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <Image src="/logo-updated.png" alt="Azad Zindagi Foundation" width={36} height={36} className="rounded-lg" />
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors hidden sm:block">
              Azad Zindagi Foundation
            </span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 mb-5">
            <Heart className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">UPI Donation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Donate by{" "}
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              Scanner, UPI, or Bank Transfer
            </span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Support our cause by donating securely via UPI scanner or direct bank transfer using the details below.
          </p>

          <div className="mt-8 max-w-xl mx-auto text-left bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Your support helps us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                Reintegration of missing children back home
              </li>
              <li className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                Investigating missing cases and field work
              </li>
              <li className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                Travel assistance for the child and parents
              </li>
              <li className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                Educational support for vulnerable girls
              </li>
              <li className="flex items-center gap-3 text-zinc-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                Conducting education and awareness campaigns
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm p-6">
              <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                Choose Amount
              </h2>
              <p className="text-zinc-500 text-sm mb-5">Pick a preset amount or enter a custom donation.</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {PRESET_AMOUNTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      !customAmount.trim() && amount === value
                        ? "border-orange-500 bg-orange-500/15 text-orange-300 shadow-lg shadow-orange-500/10"
                        : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/20 hover:bg-white/6"
                    }`}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded-xl border border-white/10 bg-white/3">
                <span className="pl-4 text-zinc-400 font-semibold text-lg">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter custom amount"
                  className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                How to Pay
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">UPI ID</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="w-full inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                  >
                    <span className="truncate">{UPI_ID}</span>
                    <span className="inline-flex items-center gap-2 text-orange-300">
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">Bank Transfer</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-zinc-300">
                    <p><span className="text-zinc-500">Name:</span> Azad Zindagi Foundation</p>
                    <p><span className="text-zinc-500">C/A:</span> 50200121687149</p>
                    <p><span className="text-zinc-500">IFSC:</span> HDFC0010006</p>
                    <p><span className="text-zinc-500">Branch:</span> Virar West</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-6 text-center">
              <h3 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">Scanner</h3>
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white p-4">
                <Image
                  src="/qr-code.png"
                  alt="HDFC SmartHub Vyapar QR Code - Azad Zindagi Foundation"
                  width={800}
                  height={800}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
              <p className="mt-4 text-sm text-zinc-300">
                Scan this image from your payment app to donate instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Donation Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Selected Amount</span>
                  <span className="text-white font-semibold">₹{finalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Payment Method</span>
                  <span className="text-green-400 font-medium">UPI Only</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-orange-400 font-bold text-lg">₹{finalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
