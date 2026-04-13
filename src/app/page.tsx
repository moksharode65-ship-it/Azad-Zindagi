"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Shield,
  BookOpen,
  Users,
  Target,
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
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

// Timeline data for the orbital component
const timelineData = [
  {
    id: 1,
    title: "Founded 2012",
    date: "2012",
    content: "Azad Zindagi Foundation was established with a mission to protect and empower underprivileged children across India.",
    category: "Milestone",
    icon: Star,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Child Safety Program",
    date: "2014",
    content: "Launched comprehensive child safety initiatives reaching 5,000+ children in rural communities.",
    category: "Program",
    icon: Shield,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Education Initiative",
    date: "2016",
    content: "Started free education programs providing books, uniforms, and tutoring to 3,000+ students annually.",
    category: "Program",
    icon: BookOpen,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Healthcare Camps",
    date: "2018",
    content: "Established mobile healthcare units conducting regular medical camps in underserved areas.",
    category: "Program",
    icon: Heart,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 5,
    title: "Skill Development",
    date: "2020",
    content: "Introduced vocational training programs for youth, enabling sustainable livelihoods.",
    category: "Program",
    icon: Users,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 6,
    title: "Vision 2030",
    date: "2024-2030",
    content: "Expanding reach to 100,000 children with holistic development programs across 10 states.",
    category: "Future",
    icon: Target,
    relatedIds: [5],
    status: "pending" as const,
    energy: 40,
  },
];

// Testimonials data
const testimonials = [
  {
    id: 5,
    testimonial: "Azad Foundation gave my children the education they deserve. Today, my daughter is the first in our family to go to college.",
    author: "Priya Devi - Mother of two beneficiaries"
  },
  {
    id: 8,
    testimonial: "The skill training program changed my life. I now have a stable job and can support my entire family with dignity.",
    author: "Rajesh Kumar - Program Graduate"
  },
  {
    id: 12,
    testimonial: "As a donor, I trust Azad Foundation completely. They are transparent, efficient, and truly make a difference.",
    author: "Anita Sharma - Regular Donor since 2018"
  }
];

// Programs data
const programs = [
  {
    icon: Shield,
    title: "Child Safety",
    description: "24/7 helpline, rescue operations, and rehabilitation for children at risk.",
    impact: "5,000+ children protected",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "Free schooling, books, uniforms, and after-school tutoring programs.",
    impact: "3,000+ students enrolled",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Heart,
    title: "Healthcare Access",
    description: "Mobile medical units, regular checkups, and emergency medical support.",
    impact: "10,000+ health camps",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Women Empowerment",
    description: "Skill development, microfinance, and self-help groups for women.",
    impact: "2,000+ women trained",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Leaf,
    title: "Sustainable Livelihoods",
    description: "Vocational training and job placement for youth and adults.",
    impact: "1,500+ employed",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Globe,
    title: "Community Development",
    description: "Infrastructure development, clean water, and sanitation projects.",
    impact: "50+ villages transformed",
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
const teamMembers = [
  { name: "Dr. Meera Patel", role: "Founder & Chairperson", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Rajiv Sharma", role: "Executive Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "Priya Nair", role: "Program Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Amit Verma", role: "Finance Head", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
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
  },
  {
    title: "Women Who Lead: Success Stories",
    excerpt: "Inspiring stories of women who transformed their lives through our programs...",
    date: "Mar 28, 2026",
    image: "https://images.unsplash.com/photo-1573167507397-4a47b2b930a0?w=600&q=80",
    category: "Empowerment"
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
              src="/logo.jpeg"
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
            <a href="#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">About</a>
            <a href="#programs" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Programs</a>
            <a href="#impact" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Impact</a>
            <a href="#team" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Team</a>
            <a href="#blog" className="text-sm text-foreground/80 hover:text-foreground transition-colors font-medium">Blog</a>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              Donate Now
            </Button>
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
            <a href="#about" className="block text-foreground/80 hover:text-foreground font-medium text-lg">About</a>
            <a href="#programs" className="block text-foreground/80 hover:text-foreground font-medium text-lg">Programs</a>
            <a href="#impact" className="block text-foreground/80 hover:text-foreground font-medium text-lg">Impact</a>
            <a href="#team" className="block text-foreground/80 hover:text-foreground font-medium text-lg">Team</a>
            <a href="#blog" className="block text-foreground/80 hover:text-foreground font-medium text-lg">Blog</a>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 h-12 text-lg">Donate Now</Button>
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
    <section id="about" className="relative py-24 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80)] bg-cover bg-center opacity-10"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
              About Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              12+ Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">Creating Change</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Azad Zindagi Foundation is a registered non-profit organization dedicated to protecting children's rights,
              providing quality education, and empowering communities across India.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Since 2012, we have been working tirelessly to ensure that every child has access to safety,
              education, and healthcare. Our transparent approach ensures that your donations make a real impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-foreground/80">
                <Award className="w-5 h-5 text-orange-400" />
                <span>80G Certified</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Verified NGO</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.9★ Rating</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
                alt="Children learning"
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-foreground font-semibold text-lg">Education for All</p>
                <p className="text-foreground/60 text-sm">Our flagship program since 2016</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
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
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
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
              <Card className="bg-zinc-900/50 border-border hover:border-orange-500/30 transition-all duration-300 group">
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
    <section id="impact" className="relative py-24 overflow-hidden">
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80)] bg-cover bg-center opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/90 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
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
                <stat.icon className="w-8 h-8 text-foreground" />
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

// Timeline Section
function TimelineSection() {
  return (
    <section className="py-24 bg-background">
      <RadialOrbitalTimeline timelineData={timelineData} />
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">Hope</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Drag the cards to see more stories from our community
          </p>
        </motion.div>

        <div className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center">
          <div className="relative -ml-[145px] h-[400px] md:h-[450px] w-[290px] md:w-[350px] md:-ml-[175px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
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
          <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
            Leadership
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to making a difference in the lives of underprivileged communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-4 rounded-2xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
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
              <Card className="bg-zinc-900/50 border-border overflow-hidden group hover:border-orange-500/30 transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
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
          <Heart className="w-16 h-16 text-foreground mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Support Can Change Lives
          </h2>
          <p className="text-xl text-foreground/90 mb-8 max-w-2xl mx-auto">
            Every donation, no matter how small, makes a real difference in the lives of
            underprivileged children and communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-zinc-100 font-semibold px-8 py-6 text-lg"
            >
              Donate Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-foreground hover:bg-white/10 font-semibold px-8 py-6 text-lg"
            >
              Become a Partner
            </Button>
          </div>
          <p className="text-foreground/70 text-sm mt-6">
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
                src="/logo.jpeg"
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
              Empowering lives, protecting children, and building stronger communities since 2012.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
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
              <li><a href="#" className="hover:text-foreground transition-colors">Women Empowerment</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Skill Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5" />
                <span>123 NGO Street, Sector 15<br />New Delhi, India 110001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>info@azadfoundation.org</span>
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
      <ProgramsSection />
      <ImpactSection />
      <TimelineSection />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <DonateCTA />
      <Footer />
    </div>
  );
}
