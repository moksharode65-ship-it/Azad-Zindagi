"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard ({ handleShuffle, testimonial, position, id, author }) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] md:h-[450px] w-[90vw] md:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-orange-500/20 bg-card shadow-xl backdrop-blur-md transition-colors duration-500 ${
        isFront ? "cursor-grab active:cursor-grabbing hover:border-orange-500/40" : ""
      }`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-orange-500/50 bg-slate-200 object-cover"
      />
      <span className="text-center text-lg italic text-white/80">&quot;{testimonial}&quot;</span>
      <span className="text-center text-sm font-medium text-orange-400">{author}</span>
    </motion.div>
  );
};
