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
  Calendar
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
    title: "Awareness & Education",
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
  { number: "15,000+", label: "Children Impacted", icon: Users },
  { number: "12+", label: "Years of Service", icon: Calendar },
  { number: "50,000+", label: "Lives Touched", icon: Heart },
  { number: "100%", label: "Transparent", icon: Award },
];

// Team members
const directors = [
  { name: "Mr. Samuel Sonkamble", image: "/samuel-sonkamble.jpeg" },
  { name: "Mr. Lucas Caldeira", image: "/lucas-caldeira.jpeg" },
  { name: "Dr. Stella Bokare", image: "/stella-bokare.jpeg" },
];

const promoters = [
  { name: "Mr. Nayan Mali", image: "/nayan.webp" },
  { name: "Ms. Prashansa Sanjay Dalvi", image: "/prashansa-sanjay-dalvi.jpeg" },
];

// Blog posts
const blogPosts = [
  {
    title: "How Education Transforms Communities",
    excerpt: "Our education program has helped over 3,000 children access quality schooling...",
    date: "Apr 10, 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    category: "Education"
  },
  {
    title: "Child Safety: A Community Responsibility",
    excerpt: "Learn how communities can come together to protect children from harm...",
    date: "Apr 5, 2026",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
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

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
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
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80)] bg-cover bg-center opacity-20"
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
                A collective of like-minded individuals from diverse fields united with a shared commitment to defend voiceless children. Guided by a strong child rights ethos, they work through targeted initiatives to safeguard every child&apos;s protection rights, promote safety, and ensure vulnerable children receive the care, dignity, and security they deserve.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Prior to its formal registration, the initiative operated under various organisations, sustained by the unwavering commitment, encouragement, and financial support of individuals to protect and uplift vulnerable children since 2019. Finally, Azad Zindagi Foundation was incorporated in 2025 as a not-for-profit organisation registered under Section 8 of the Companies Act, 2013.
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
            <span className="text-xl font-bold text-foreground mb-1">80G Certified</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left">100% Tax Exempt Donations</span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start p-6 md:p-8 rounded-[2rem] bg-background/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-500/30 group">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-green-500" />
            </div>
            <span className="text-xl font-bold text-foreground mb-1">Section 8</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left">Registered Non-Profit Govt Org</span>
          </div>
          
          <div className="flex flex-col items-center sm:items-start p-6 md:p-8 rounded-[2rem] bg-background/50 border border-border/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/30 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-amber-500" />
            </div>
            <span className="text-xl font-bold text-foreground mb-1">Child Focus</span>
            <span className="text-sm text-muted-foreground text-center sm:text-left">Safety and Protection First</span>
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
            Comprehensive programs designed to create lasting change in the lives of underprivileged children and communities.
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
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80)] bg-cover bg-center opacity-20"
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
            Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">Lives</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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

// Testimonials Section
function TestimonialsSection() {
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
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">Hope</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <video 
              src="/WhatsApp%20Video%202026-06-29%20at%206.42.47%20PM.mp4" 
              controls 
              className="w-full aspect-video object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <video 
              src="/prince-story.mp4" 
              controls 
              className="w-full aspect-video object-cover"
            />
          </motion.div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden group hover:border-orange-500/30 transition-all">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-foreground border-orange-500">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Button variant="link" className="text-orange-400 p-0 h-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Donate CTA Section
function DonateCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-green-600" />
      <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
        >
          <Heart className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Support Can Change Lives
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every donation, no matter how small, makes a real difference in the lives of
            underprivileged children and communities.
          </p>
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
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#programs" className="hover:text-foreground transition-colors">Programs</a></li>
              <li><a href="#impact" className="hover:text-foreground transition-colors">Impact</a></li>
              <li><a href="#team" className="hover:text-foreground transition-colors">Team</a></li>
              <li><a href="#blog" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Child Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Skill Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
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
          <p className="text-zinc-500 text-sm">
            © 2026 Azad Foundation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
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
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <DonateCTA />
      <Footer />
    </div>
  );
}
