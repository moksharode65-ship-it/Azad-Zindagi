"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

type ViewMode = "orbital" | "list";
type ThemeMode = "classic" | "azad";

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<ViewMode>("orbital");
  const [themeMode, setThemeMode] = useState<ThemeMode>("classic");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const centerGradient =
    themeMode === "classic"
      ? "from-purple-500 via-blue-500 to-teal-500"
      : "from-orange-500 via-orange-400 to-green-500";

  const energyGradient =
    themeMode === "classic" ? "from-blue-500 to-purple-500" : "from-orange-500 to-green-500";

  const nodeDefault =
    themeMode === "classic" ? "bg-background text-foreground" : "bg-gradient-to-br from-orange-500 to-green-500 text-foreground";

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 200;
    const radian = (angle * Math.PI) / 180;

    const x = Number((radius * Math.cos(radian)).toFixed(3));
    const y = Number((radius * Math.sin(radian)).toFixed(3));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number(Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))).toFixed(3));

    return { x, y, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-foreground bg-background border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-foreground bg-background/40 border-white/50";
      default:
        return "text-foreground bg-background/40 border-white/50";
    }
  };

  if (viewMode === "list") {
    return (
      <div className="w-full bg-background text-foreground border border-border rounded-2xl p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h3 className="text-xl font-bold">Program Timeline</h3>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-white/20 text-foreground" onClick={() => setViewMode("orbital")}>
              Orbital View
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-foreground" onClick={() => setThemeMode(themeMode === "classic" ? "azad" : "classic")}>
              Theme: {themeMode === "classic" ? "Classic" : "AZF"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {timelineData.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="bg-zinc-950 border-white/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
                        <Icon size={15} />
                      </div>
                      <CardTitle className="text-sm text-foreground">{item.title}</CardTitle>
                    </div>
                    <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>{item.status.toUpperCase()}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-xs text-foreground/80">
                  <div className="mb-2 text-foreground/60">{item.date} • {item.category}</div>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[82vh] md:h-screen flex flex-col items-center justify-center bg-background overflow-hidden rounded-2xl border border-border"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="w-full max-w-4xl px-4 pt-4 md:pt-6 flex items-center justify-between z-50">
        <h3 className="text-foreground font-semibold">Radial Orbital Timeline</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" className="border-white/20 text-foreground" onClick={() => setViewMode("list")}>
            List View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-foreground"
            onClick={() => setAutoRotate((v) => !v)}
          >
            {autoRotate ? "Auto Rotate: On" : "Auto Rotate: Off"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-foreground"
            onClick={() => setThemeMode(themeMode === "classic" ? "azad" : "classic")}
          >
            Theme: {themeMode === "classic" ? "Classic" : "AZF"}
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          <div className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${centerGradient} animate-pulse flex items-center justify-center z-10 scale-75 md:scale-100`}>
            <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-border animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>
          
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-border"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isExpanded ? "bg-white text-black" : isRelated ? "bg-white/50 text-black" : nodeDefault}
                  border-2 
                  ${isExpanded ? "border-white shadow-lg shadow-white/30" : isRelated ? "border-white animate-pulse" : "border-white/40"}
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-foreground scale-125" : "text-foreground/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[85vw] max-w-64 bg-background/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-foreground/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-foreground/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${energyGradient}`} style={{ width: `${item.energy}%` }}></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-foreground/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-foreground/70">Connected Nodes</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-foreground/80 hover:text-foreground transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-foreground/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
