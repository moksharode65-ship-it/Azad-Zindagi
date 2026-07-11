"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Users,
  Scale,
  Megaphone,
  Eye,
  Target,
  X,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────
const VISION = {
  title: "Vision",
  description:
    "To see trafficked and rescued missing children assisted, the vulnerable protected, captives set free, and the oppressed experiencing hope and healing as neighbours are transformed.",
  icon: Eye,
  color: "orange" as const,
};

const MISSION = {
  title: "Mission",
  description:
    "To mobilize communities, financial partners, and all segments of society towards ending human trafficking and creating new futures through community-based action.",
  icon: Target,
  color: "green" as const,
};

const CORE_VALUES = [
  {
    title: "Compassion and Respect",
    shortTitle: "Compassion",
    description:
      "We believe everyone should be treated with compassion, dignity, and respect, recognizing their inherent worth and potential.",
    icon: Heart,
    color: "orange" as const,
  },
  {
    title: "Empowerment",
    shortTitle: "Empowerment",
    description:
      "We believe in empowering children, families, and communities to build a safer and joyous future.",
    icon: Users,
    color: "green" as const,
  },
  {
    title: "Inclusivity and Non-Discrimination",
    shortTitle: "Inclusivity",
    description:
      "We believe in championing diversity and inclusivity in India, ensuring that all people, regardless of their background or circumstances, receive equal protection and opportunities.",
    icon: Shield,
    color: "orange" as const,
  },
  {
    title: "Collaboration and Partnership",
    shortTitle: "Collaboration",
    description:
      "We believe in fostering collaborative efforts with government mechanisms, NGOs, families, communities, and other stakeholders to create a comprehensive support system for protection and development.",
    icon: Scale,
    color: "green" as const,
  },
  {
    title: "Advocacy and Policy Influence",
    shortTitle: "Advocacy",
    description:
      "We believe in advocating for the rights of children and in influencing policy changes to create systemic improvements in child protection.",
    icon: Megaphone,
    color: "orange" as const,
  },
];

// ─── Detail Card ────────────────────────────────────────
function DetailCard({
  title,
  description,
  icon: Icon,
  color,
  onClose,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: "orange" | "green";
  onClose: () => void;
}) {
  const borderColor =
    color === "orange" ? "border-orange-500/40" : "border-green-500/40";
  const iconBg =
    color === "orange" ? "bg-orange-500/15" : "bg-green-500/15";
  const iconColor =
    color === "orange" ? "text-orange-500" : "text-green-500";
  const glowColor =
    color === "orange"
      ? "shadow-orange-500/20"
      : "shadow-green-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`absolute z-50 w-[90vw] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border ${borderColor} bg-background/95 dark:bg-background/90 backdrop-blur-2xl p-6 md:p-8 shadow-2xl ${glowColor}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      </div>

      {description.split("\n\n").map((para, i) => (
        <p
          key={i}
          className="text-muted-foreground leading-relaxed text-base mb-3 last:mb-0"
        >
          {para}
        </p>
      ))}
    </motion.div>
  );
}

// ─── Orbital Node ───────────────────────────────────────
function OrbitalNode({
  title,
  icon: Icon,
  color,
  onClick,
  isActive,
}: {
  title: string;
  icon: React.ElementType;
  color: "orange" | "green";
  onClick: () => void;
  isActive: boolean;
}) {
  const borderColor =
    color === "orange"
      ? "border-orange-500/30 hover:border-orange-500/60"
      : "border-green-500/30 hover:border-green-500/60";
  const iconBg =
    color === "orange" ? "bg-orange-500/15" : "bg-green-500/15";
  const iconColor =
    color === "orange" ? "text-orange-500" : "text-green-500";
  const glow = isActive
    ? color === "orange"
      ? "shadow-[0_0_25px_rgba(249,115,22,0.5)]"
      : "shadow-[0_0_25px_rgba(34,197,94,0.5)]"
    : "";

  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${
        isActive ? "scale-110" : "hover:scale-105"
      }`}
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 ${borderColor} ${iconBg} backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${glow}`}
      >
        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${iconColor}`} />
      </div>
      <span className="text-[11px] md:text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap max-w-[80px] md:max-w-none text-center leading-tight">
        {title}
      </span>
    </button>
  );
}

// ─── Desktop Orbital View ───────────────────────────────
function DesktopOrbital({
  activeItem,
  setActiveItem,
}: {
  activeItem: string | null;
  setActiveItem: (v: string | null) => void;
}) {
  const isPaused = activeItem !== null;
  const [rotationInner, setRotationInner] = useState(0);
  const [rotationOuter, setRotationOuter] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setRotationInner((prev) => (prev + 0.6) % 360);
      setRotationOuter((prev) => (prev - 0.3) % 360);
    }, 50);

    return () => clearInterval(timer);
  }, [isPaused]);

  const getCoordinates = (radiusPct: number, initialAngleDeg: number, currentRotation: number) => {
    const angle = initialAngleDeg + currentRotation;
    const radian = (angle * Math.PI) / 180;
    const x = 50 + radiusPct * Math.cos(radian);
    const y = 50 + radiusPct * Math.sin(radian);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div
      className="relative w-full aspect-square max-w-[550px] mx-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveItem(null);
      }}
    >
      {/* Outer orbit ring */}
      <div className="absolute inset-[10%] rounded-full border border-dashed border-border/40 pointer-events-none" />
      {/* Inner orbit ring */}
      <div className="absolute inset-[30%] rounded-full border border-dashed border-border/30 pointer-events-none" />

      {/* Center Hub */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 -m-4 rounded-full border border-orange-500/20 pulse-ring" />
          <div className="absolute inset-0 -m-4 rounded-full border border-green-500/20 pulse-ring-delayed" />
          <div className="absolute inset-0 -m-4 rounded-full border border-orange-500/10 pulse-ring-delayed-2" />

          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-background flex items-center justify-center pulse-glow overflow-hidden shadow-2xl z-10 border border-orange-500/20">
            <img 
              src="/logo-updated.png" 
              alt="Azad Zindagi Foundation Logo" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>
      </div>

      {/* Inner orbit Nodes — Vision & Mission */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-75"
        style={getCoordinates(20, -90, rotationInner)}
      >
        <OrbitalNode
          title="Vision"
          icon={VISION.icon}
          color={VISION.color}
          onClick={() => setActiveItem(activeItem === "vision" ? null : "vision")}
          isActive={activeItem === "vision"}
        />
      </div>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-75"
        style={getCoordinates(20, 90, rotationInner)}
      >
        <OrbitalNode
          title="Mission"
          icon={MISSION.icon}
          color={MISSION.color}
          onClick={() => setActiveItem(activeItem === "mission" ? null : "mission")}
          isActive={activeItem === "mission"}
        />
      </div>

      {/* Outer orbit Nodes — Core Values */}
      {CORE_VALUES.map((value, index) => {
        const key = `value-${index}`;
        const initialAngle = (index / CORE_VALUES.length) * 360 - 90;

        return (
          <div
            key={key}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-75"
            style={getCoordinates(40, initialAngle, rotationOuter)}
          >
            <OrbitalNode
              title={value.shortTitle}
              icon={value.icon}
              color={value.color}
              onClick={() => setActiveItem(activeItem === key ? null : key)}
              isActive={activeItem === key}
            />
          </div>
        );
      })}

      {/* Detail card overlay */}
      <AnimatePresence>
        {activeItem === "vision" && (
          <DetailCard
            key="vision"
            {...VISION}
            onClose={() => setActiveItem(null)}
          />
        )}
        {activeItem === "mission" && (
          <DetailCard
            key="mission"
            {...MISSION}
            onClose={() => setActiveItem(null)}
          />
        )}
        {CORE_VALUES.map((value, index) => {
          const key = `value-${index}`;
          if (activeItem !== key) return null;
          return (
            <DetailCard
              key={key}
              {...value}
              onClose={() => setActiveItem(null)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Timeline View ───────────────────────────────
function MobileTimeline({
  activeItem,
  setActiveItem,
}: {
  activeItem: string | null;
  setActiveItem: (v: string | null) => void;
}) {
  const allItems = [
    { ...VISION, key: "vision" },
    { ...MISSION, key: "mission" },
    ...CORE_VALUES.map((v, i) => ({ ...v, key: `value-${i}` })),
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Vertical connecting line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/30 via-green-500/30 to-orange-500/30" />

      <div className="space-y-6">
        {allItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.key;
          const borderColor =
            item.color === "orange"
              ? "border-orange-500/30"
              : "border-green-500/30";
          const iconBg =
            item.color === "orange"
              ? "bg-orange-500/15"
              : "bg-green-500/15";
          const iconColor =
            item.color === "orange"
              ? "text-orange-500"
              : "text-green-500";
          const activeBorder =
            item.color === "orange"
              ? "border-orange-500/50"
              : "border-green-500/50";
          const activeGlow =
            item.color === "orange"
              ? "shadow-orange-500/10"
              : "shadow-green-500/10";

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="relative pl-16"
            >
              {/* Node dot on the timeline */}
              <div
                className={`absolute left-[22px] top-5 w-[18px] h-[18px] rounded-full ${iconBg} border-2 ${borderColor} flex items-center justify-center z-10`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.color === "orange"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                />
              </div>

              <button
                onClick={() =>
                  setActiveItem(isActive ? null : item.key)
                }
                className={`w-full text-left rounded-2xl border ${
                  isActive ? activeBorder : borderColor
                } bg-background/60 dark:bg-background/40 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive ? `shadow-xl ${activeGlow}` : "hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h4>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {item.description.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-muted-foreground text-sm leading-relaxed mt-3"
                        >
                          {para}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                    {item.description.split("\n\n")[0]}
                  </p>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────
export default function OrbitSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Ambient background blurs */}
      <div className="absolute top-1/4 -left-64 h-[500px] w-[500px] rounded-full bg-orange-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 h-[500px] w-[500px] rounded-full bg-green-500/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-6 md:px-8 py-3 mb-6">
            <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-green-500 dark:text-green-400">
              Vision, Mission & Values
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Why We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-orange-500">
              Exist
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Click on any orbiting element to explore our guiding principles
          </p>
        </motion.div>

        {/* Desktop: Orbital view */}
        <div className="hidden md:block">
          <DesktopOrbital
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>

        {/* Mobile: Timeline view */}
        <div className="md:hidden">
          <MobileTimeline
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>
      </div>
    </section>
  );
}
