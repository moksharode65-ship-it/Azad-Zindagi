"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Shield, Award, ArrowLeft, ArrowRight, CheckCircle2,
  XCircle, Loader2, User, Mail, Phone, MessageSquare, Lock,
  Sparkles, Users, BookOpen, Star, CreditCard, Smartphone, Building, Wallet
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000, 25000];

const IMPACT_MAP: Record<number, { icon: React.ElementType; text: string }> = {
  500:   { icon: BookOpen,  text: "Provides books & stationery for 1 child for a month" },
  1000:  { icon: Heart,     text: "Covers a health check-up for 2 children" },
  2000:  { icon: Users,     text: "Funds skill training for a youth for one week" },
  5000:  { icon: Shield,    text: "Supports child safety patrols for an entire week" },
  10000: { icon: Star,      text: "Sponsors full education for 1 child for a term" },
  25000: { icon: Sparkles,  text: "Funds a complete community development camp" },
};

const TRUST_BADGES = [
  { icon: Award,  label: "80G Certified",  sub: "Tax deductible donation" },
  { icon: Shield, label: "Verified NGO",   sub: "Govt. registered & audited" },
  { icon: Lock,   label: "Secure Payment", sub: "256-bit SSL encryption" },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) { resolve(true); return; }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const finalAmount = isCustom ? Number(customAmount) : amount;
  const impactEntry = IMPACT_MAP[amount];

  const handlePreset = (val: number) => {
    setAmount(val);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    setIsCustom(true);
  };

  const validate = () => {
    if (!finalAmount || finalAmount < 100)
      return "Minimum donation amount is ₹100.";
    if (!name.trim()) return "Please enter your full name.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
      return "Please enter a valid email address.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid 10-digit phone number.";
    return null;
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setErrorMsg(err); return; }
    setErrorMsg("");
    setLoading(true);

    try {
      // 1. Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load Razorpay SDK.");

      // 2. Create order on server
      const orderRes = await fetch("/api/donate/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, name, email, phone, message }),
      });
      if (!orderRes.ok) {
        const d = await orderRes.json();
        throw new Error(d?.error || "Failed to create order.");
      }
      const order = await orderRes.json();

      // 3. Open Razorpay checkout
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: order.id,
          amount: order.amount,
          currency: order.currency || "INR",
          name: "Azad Zindagi Foundation",
          description: "Donation — Empowering Lives",
          image: "/logo.jpeg",
          prefill: { name, email, contact: phone },
          theme: { color: "#ea580c" },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const vRes = await fetch("/api/donate/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  donor: { name, email, phone, message },
                  amount: finalAmount,
                }),
              });
              const vData = await vRes.json();
              if (vData.verified) { setStatus("success"); resolve(); }
              else { reject(new Error("Payment verification failed.")); }
            } catch (err) {
              reject(err);
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment window closed.")),
          },
        });
        rzp.open();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      // Don't show error if user just dismissed the modal
      if (!msg.includes("Payment window closed")) {
        setStatus("error");
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Success State ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-2xl shadow-green-500/30">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Thank You, {name.split(" ")[0]}!</h1>
          <p className="text-zinc-400 text-lg mb-2">
            Your donation of <span className="text-green-400 font-bold">₹{finalAmount.toLocaleString("en-IN")}</span> has been received.
          </p>
          <p className="text-zinc-500 text-sm mb-8">
            A confirmation will be sent to <span className="text-zinc-300">{email}</span>. Your 80G tax receipt will follow within 7 working days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <button
              onClick={() => { setStatus("idle"); setName(""); setEmail(""); setPhone(""); setMessage(""); setAmount(1000); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all"
            >
              <Heart className="w-4 h-4 text-orange-400" /> Donate Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main Donation Page ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-green-600/8 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            <Image src="/logo.jpeg" alt="Azad Zindagi Foundation" width={36} height={36} className="rounded-lg" />
            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors hidden sm:block">
              Azad Zindagi Foundation
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Lock className="w-3.5 h-3.5 text-green-500" />
            Secure 256-bit SSL
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 mb-5">
            <Heart className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Make a Difference Today</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              Generosity
            </span>{" "}
            Changes Lives
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Every rupee you donate goes directly toward protecting children, funding education, and empowering communities across India.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleDonate} noValidate className="space-y-8">
              {/* Step 1: Amount */}
              <div className="rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                  Choose Donation Amount
                </h2>
                <p className="text-zinc-500 text-sm mb-5">All donations are eligible for 80G tax deduction.</p>

                {/* Preset grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePreset(val)}
                      className={`relative py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        !isCustom && amount === val
                          ? "border-orange-500 bg-orange-500/15 text-orange-300 shadow-lg shadow-orange-500/10"
                          : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/20 hover:bg-white/6"
                      }`}
                    >
                      ₹{val.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className={`flex items-center rounded-xl border transition-all duration-200 ${
                  isCustom ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/3"
                }`}>
                  <span className="pl-4 text-zinc-400 font-semibold text-lg">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder="Enter custom amount"
                    className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none"
                  />
                </div>

                {/* Impact indicator */}
                <AnimatePresence mode="wait">
                  {!isCustom && impactEntry && (
                    <motion.div
                      key={amount}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3"
                    >
                      <impactEntry.icon className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <p className="text-green-300 text-sm">{impactEntry.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2: Donor Info */}
              <div className="rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Your Details
                </h2>
                <p className="text-zinc-500 text-sm mb-5">Required for your 80G tax receipt.</p>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name *"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all"
                    />
                  </div>
                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address *"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all"
                    />
                  </div>
                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile number *"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/3 border border-white/8 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all"
                    />
                  </div>
                  {/* Message */}
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Message / dedication (optional)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Info */}
              <div className="rounded-2xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">UPI / GPay / PhonePe</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">Credit & Debit Cards</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Building className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">Netbanking</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white">Wallets</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-center">
                  You will be securely redirected to Razorpay to choose your payment method and complete the transaction.
                </p>
              </div>

              {/* Error */}
              <AnimatePresence>
                {(errorMsg || status === "error") && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                  >
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{errorMsg || "Something went wrong. Please try again."}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !finalAmount}
                className="w-full relative overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Opening Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Donate ₹{finalAmount ? finalAmount.toLocaleString("en-IN") : "—"} Securely
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-zinc-600">
                By donating, you agree to our{" "}
                <Link href="/" className="text-zinc-400 hover:text-white underline underline-offset-2">Privacy Policy</Link>.
                {" "}All transactions are encrypted and secure.
              </p>
            </form>
          </motion.div>

          {/* ── Right: Trust + Info ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Summary card */}
            <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-6">
              <h3 className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">Donation Summary</h3>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Donation Amount</span>
                  <span className="text-white font-semibold">
                    ₹{finalAmount ? finalAmount.toLocaleString("en-IN") : "—"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Payment Gateway Fee</span>
                  <span className="text-green-400 font-medium">₹0 (We absorb it)</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-orange-400 font-bold text-lg">
                    ₹{finalAmount ? finalAmount.toLocaleString("en-IN") : "—"}
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-300 text-xs">
                💚 100% of your donation reaches the cause. No hidden charges.
              </div>
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Why Trust Us</h3>
              <div className="space-y-4">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{b.label}</p>
                      <p className="text-xs text-zinc-500">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-white/8 bg-zinc-900/60 p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "15,000+", l: "Children Helped" },
                  { n: "12+ Yrs", l: "In Service" },
                  { n: "18+", l: "States Active" },
                  { n: "100%", l: "Transparent" },
                ].map((s) => (
                  <div key={s.l} className="text-center p-3 rounded-xl bg-white/3">
                    <div className="text-xl font-bold text-orange-400">{s.n}</div>
                    <div className="text-xs text-zinc-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <p className="text-center text-xs text-zinc-600">
              Questions?{" "}
              <a href="mailto:info@azadfoundation.org" className="text-zinc-400 hover:text-white underline underline-offset-2">
                info@azadfoundation.org
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
