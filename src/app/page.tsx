"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  BookOpen,
  Users,
  Award,
  Leaf,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Star,
  Globe,
  Sparkles,
  Calendar,
  Megaphone,
  Search,
  Home as HomeIcon,
  Handshake,
  Landmark,
  CheckCircle2
} from "lucide-react";
import HeroSection from "@/components/ui/glassmorphism-trust-hero";
import OrbitSection from "@/components/ui/orbit-section";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";




// Programs data
const programs = [
  {
    icon: Shield,
    title: "Tracing & Reintegration",
    description: "Support for rescued, missing, and trafficked children through tracing and home investigation.",
    impact: "Family reunification support",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: BookOpen,
    title: "Education and Awareness",
    description: "Campaigns on human trafficking, POCSO, career guidance, and online safety.",
    impact: "Community education drives",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Educational Assistance",
    description: "Help for POCSO victims and children of trafficked survivors or victims.",
    impact: "Support for vulnerable children",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Sports, seminars, workshops, rallies, and local protection mechanisms.",
    impact: "Stronger child-safe communities",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Leaf,
    title: "Child-Friendly Community",
    description: "Mobilizing society to protect children and create safe, hopeful neighborhoods.",
    impact: "Long-term prevention",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Partnership & Advocacy",
    description: "Working with law enforcement, government agencies, NGOs, and local bodies.",
    impact: "System-wide collaboration",
    color: "from-teal-500 to-green-500"
  }
];

// Impact stats
const impactStats = [
  { number: "129", label: "Awareness & education campaigns", icon: Megaphone },
  { number: "29,463", label: "Children prevented through education", icon: Shield },
  { number: "1,603", label: "Missing cases assisted", icon: Search },
  { number: "988", label: "Children reintegrated & rehabilitated", icon: HomeIcon },
  { number: "215", label: "Home Investigations conducted", icon: MapPin },
  { number: "09", label: "Children receiving educational support", icon: BookOpen },
  { number: "16+", label: "NGO partners", icon: Handshake },
  { number: "32+", label: "Collaborations with Govt. mechanisms", icon: Landmark },
  { number: "33,969+", label: "Total lives impacted", icon: Users },
];

// Team members
const directors = [
  { name: "Mr. Samuel Sonkamble", image: "/samuel-sonkamble.jpeg" },
  { name: "Mr. Lucas Caldeira", image: "/lucas-caldeira.jpeg" },
  { name: "Dr. Stella Bokare", image: "/stella-bokare.jpeg" },
];

const promoters = [
  { name: "Mr. Nayan Mali", image: "/nayan.webp" },
  { name: "Ms. Prashansa Dalvi", image: "/prashansa-sanjay-dalvi.jpeg" },
];

// Blog posts
const blogPosts = [
  {
    title: "How Education Transforms Communities",
    excerpt: "Our education program has helped over 3,000 children access quality schooling...",
    date: "Apr 10, 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fm=webp&fit=crop&w=600&q=75",
    category: "Education"
  },
  {
    title: "Child Safety: A Community Responsibility",
    excerpt: "Learn how communities can come together to protect children from harm...",
    date: "Apr 5, 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fm=webp&fit=crop&w=600&q=75",
    category: "Safety"
  }
];

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-updated.png"
              alt="Azad Zindagi Foundation"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">AZAD ZINDAGI</span>
              <span className="text-xs text-muted-foreground tracking-wider">FOUNDATION</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Home</a>
            <a href="#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">About</a>
            <a href="#programs" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Programs</a>
            <a href="#impact" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Impact</a>
            <a href="#team" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Team</a>
            <a href="#blog" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Blog</a>
            <Link href="/donate">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Donate Now
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border shadow-xl">
          <div className="px-4 py-6 space-y-4">
            <a href="#home" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#about" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>About</a>
            <a href="#programs" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>Programs</a>
            <a href="#impact" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>Impact</a>
            <a href="#team" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>Team</a>
            <a href="#blog" className="block text-foreground/80 hover:text-foreground font-medium text-lg" onClick={() => setIsOpen(false)}>Blog</a>
            <Link href="/donate" className="w-full" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 h-12 text-lg">Donate Now</Button>
            </Link>
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// About Section with Parallax
function AboutSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fm=webp&fit=crop&w=1200&q=75)] bg-cover bg-center opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20 shadow-sm px-4 py-1.5 text-sm">
              About Us
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
              Protecting Children and <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-500">Creating a Child-Friendly Community</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed border-l-4 border-orange-500 pl-6">
                Azad Zindagi affirms that every child&apos;s life is precious and deserves a safe, protective environment where they can grow free from harm, abuse, and exploitation.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                A collective of like-minded individuals from diverse fields united with a shared commitment to defend voiceless children. Guided by a strong child rights ethos, we work through targeted initiatives to safeguard every child&apos;s protection rights, promote safety, and ensure vulnerable children receive the care, dignity, and security they deserve.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Prior to its formal registration, the child protection initiative operated under various organisations, sustained by the unwavering commitment, encouragement, and financial support of individuals to protect and uplift vulnerable children since 2019. Finally, Azad Zindagi Foundation was incorporated in 2025 as a not-for-profit organisation registered under Section 8 of the Companies Act, 2013.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] shadow-2xl">
              <Image
                src="/about-image.jpeg"
                alt="Children learning"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-xl mb-1">Rights, Safety, and Reintegration</p>
                <p className="text-white/80 text-sm font-medium">Working for rescued and vulnerable children</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex flex-col items-center sm:items-start p-6 md:p-8 rounded-[2rem] bg-background/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500/30 group">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7 text-orange-500" />
            </div>
            <span className="text-lg font-bold text-foreground mb-1 leading-tight text-center sm:text-left">Incorporated under Section 8</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left mt-2 block">
              of the Companies Act, 2013 as a not-for-profit organisation<br /><br />
              <strong className="text-foreground">Date of incorporation:</strong> 13/10/2025
            </span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start p-6 md:p-8 rounded-[2rem] bg-background/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-500/30 group">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-green-500" />
            </div>
            <span className="text-lg font-bold text-foreground mb-1 leading-tight text-center sm:text-left">Registration Details</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left mt-2 block space-y-2">
              <span className="block"><strong className="text-foreground">CIN:</strong> U88900MH2025NPL458914</span>
              <span className="block"><strong className="text-foreground">Darpan ID:</strong> MH/2026/1031675</span>
            </span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start p-6 md:p-8 rounded-[2rem] bg-background/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/30 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-amber-500" />
            </div>
            <span className="text-lg font-bold text-foreground mb-1 leading-tight text-center sm:text-left">Tax Details</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left mt-2 block space-y-2">
              <span className="block"><strong className="text-foreground">PAN details:</strong> ABDCA9553B</span>
              <span className="block"><strong className="text-foreground">TAN details:</strong> PNEA56777A</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  return <OrbitSection />;
}

// Programs Section
function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 text-lg md:text-xl px-6 md:px-8 py-3 font-semibold">
            Our Programs
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Making a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focused on Child protection issues - if not all, but one child at a time. <br className="hidden md:block" />A step towards AZADI (Freedom)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-orange-500/30 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <program.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">{program.description}</CardDescription>
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-foreground font-medium">{program.impact}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Impact Stats Section with Parallax
function ImpactSection() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section id="impact" className="relative py-24 bg-background overflow-hidden">
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fm=webp&fit=crop&w=1200&q=75)] bg-cover bg-center opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 text-lg md:text-xl px-6 md:px-8 py-3 font-semibold">
            Our Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The difference we <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">make</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium">(Same team, same work but new registration)</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Photo & Video Gallery Section
function GallerySection() {
  const images = Array.from({ length: 18 }, (_, i) => `/gallery/gallery-${i + 1}.jpeg`);
  
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 text-lg md:text-xl px-6 md:px-8 py-3 font-semibold">
            Our Work in Action
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Photo <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our initiatives, campaigns, and the lives we touch.
          </p>
        </motion.div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.08 }}
              className="relative aspect-square overflow-hidden rounded-lg md:rounded-xl border border-border/50 shadow-lg group bg-zinc-900"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Search className="w-8 h-8 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 text-lg md:text-xl px-6 md:px-8 py-3 font-semibold">
            Key Functionaries & Promoters
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to making a difference in the lives of underprivileged communities.
          </p>
        </motion.div>

        <div className="space-y-10">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Key Functionaries</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {directors.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Promoters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {promoters.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30 text-lg md:text-xl px-6 md:px-8 py-3 font-semibold">
            Blog & News
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">Updates</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, news, and insights from our work in the field.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm p-12 text-center max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[300px]"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Coming Soon</h3>
          <p className="text-muted-foreground text-lg">
            We are working on bringing you the latest stories, news, and insights from our work in the field. This section will be activated shortly!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Donate CTA Section
function DonateCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-green-600" />
      <div className="absolute inset-0 bg-[url(/cubes.png)] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
        >
          <Heart className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your support helps us
          </h2>
          <div className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-left bg-black/20 p-6 md:p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> Reintegration of missing children back home</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> Investigating missing cases and field work</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> Travel assistance for the child and parents</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> Educational support for vulnerable girls</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> Conducting education and awareness campaigns</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-zinc-100 font-semibold px-8 py-6 text-lg"
              >
                Donate Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-white/70 text-sm mt-6">
            All donations are 100% tax deductible under Section 80G
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-updated.png"
                alt="Azad Zindagi Foundation"
                width={56}
                height={56}
                className="w-14 h-14"
                priority
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground leading-tight">AZAD ZINDAGI</span>
                <span className="text-xs text-muted-foreground tracking-wider">FOUNDATION</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Protecting children, preventing trafficking, and building safer communities through action and partnership.
            </p>
            <div className="flex gap-4">
              <a href="#" title="Facebook" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" title="Twitter" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" title="Instagram" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" title="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-foreground transition-colors">Programs</a></li>
              <li><a href="#impact" className="hover:text-foreground transition-colors">Impact</a></li>
              <li><a href="#team" className="hover:text-foreground transition-colors">Team</a></li>
              <li><a href="#blog" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Child Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Skill Development</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                <span>F 102 &amp; 103, Violet Bldg 16<br />Yashwant Nagar, Virar West, Palghar, Maharashtra 401303</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>9892849479</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>azadzindagifoundation@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-orange-400 mt-0.5" />
                <span>CIN: U88900MH2025NPL458914</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">
            © 2026 Azad Foundation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">80G Certificate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <ProgramsSection />
      <ImpactSection />
      <GallerySection />
      <TeamSection />
      <BlogSection />
      <DonateCTA />
      <Footer />
    </div>
  );
}
