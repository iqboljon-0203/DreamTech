"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  colSpan = 1,
  rowSpan = 1,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "row-span-1 rounded-xl group/bento transition duration-200 shadow-none p-4 bg-card border border-border justify-between flex flex-col space-y-4 overflow-hidden relative",
        colSpan === 2 && "md:col-span-2",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-electric-blue/20 via-deep-purple/20 to-electric-blue/20 blur-sm" />
        <div className="absolute inset-[1px] rounded-xl bg-card" />
      </div>
      
      {/* Spotlight effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-deep-purple/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        {header}
      </div>
      
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <div className="font-sans font-bold text-foreground">
            {title}
          </div>
        </div>
        <div className="font-sans font-normal text-muted-foreground text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

// Animated skeleton for Bento headers
export function BentoSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background:
            "linear-gradient(-45deg, #0a0a0a, #171717, #1a1a1a, #0a0a0a)",
          backgroundSize: "400% 400%",
        }}
      />
    </div>
  );
}

// Code animation placeholder for Web Development card
export function CodeAnimation({ className }: { className?: string }) {
  const codeLines = [
    { width: "60%", delay: 0 },
    { width: "80%", delay: 0.1 },
    { width: "45%", delay: 0.2 },
    { width: "90%", delay: 0.3 },
    { width: "70%", delay: 0.4 },
    { width: "55%", delay: 0.5 },
  ];

  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-zinc-900/50 p-6 overflow-hidden flex-col justify-center",
        className
      )}
    >
      <div className="w-full space-y-3">
        {codeLines.map((line, idx) => (
          <motion.div
            key={idx}
            className="h-3 rounded-full bg-gradient-to-r from-electric-blue to-deep-purple shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: line.width }}
            initial={{ opacity: 0.2, x: -20 }}
            animate={{ opacity: [0.4, 1, 0.4], x: 0, width: [line.width, "100%", line.width] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Phone mockup for Mobile Apps card
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] items-center justify-center p-4",
        className
      )}
    >
      <motion.div
        className="relative w-24 h-40 rounded-[2rem] border-[4px] border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl shadow-purple-500/20"
        animate={{ y: [0, -10, 0], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-zinc-800 rounded-full z-10" />
        
        {/* Screen content */}
        <div className="absolute inset-1 bg-zinc-950 rounded-[1.5rem] overflow-hidden flex flex-col">
          {/* App Header */}
          <div className="h-8 bg-zinc-900 w-full mb-2" />
          
          {/* App Items */}
          <div className="p-2 space-y-2">
            <motion.div 
              className="w-full h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-deep-purple/20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
             <motion.div 
              className="w-full h-12 rounded-xl bg-zinc-800/50"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          
          {/* Floating Button */}
          <motion.div 
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-electric-blue shadow-lg shadow-blue-500/50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// UI/UX Design Animation
export function UIUXAnimation({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] items-center justify-center relative overflow-hidden",
        className
      )}
    >
      {/* Floating Shapes */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-electric-blue/30 blur-xl"
        animate={{ 
          x: [-20, 20, -20], 
          y: [-10, 10, -10],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: "20%", top: "20%" }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-deep-purple/30 blur-xl"
        animate={{ 
          x: [20, -20, 20], 
          y: [10, -10, 10],
          scale: [1.2, 1, 1.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: "20%", bottom: "20%" }}
      />
      
      {/* Cursor element */}
      <motion.div
        className="relative z-10"
        initial={{ x: -30, y: 30 }}
        animate={{ x: 30, y: -30 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Cards being hovered */}
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        <motion.div 
          className="w-12 h-16 bg-zinc-800 rounded-lg border border-white/5"
          animate={{ scale: [1, 0.9, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
        />
        <motion.div 
          className="w-12 h-16 bg-zinc-800 rounded-lg border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-700"
          animate={{ scale: [1, 1.1, 1], zIndex: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div 
          className="w-12 h-16 bg-zinc-800 rounded-lg border border-white/5"
          animate={{ scale: [1, 0.9, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
        />
      </div>
    </div>
  );
}

// Growth chart for SEO card
export function GrowthChart({ className }: { className?: string }) {
  const bars = [30, 45, 35, 60, 50, 75, 90];

  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] items-end justify-center gap-1.5 p-4",
        className
      )}
    >
      {bars.map((height, idx) => (
        <motion.div
          key={idx}
          className="w-3 md:w-4 rounded-t-md bg-gradient-to-t from-electric-blue to-deep-purple shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          initial={{ height: 0 }}
          animate={{ height: `${height}%`, opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            delay: idx * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

// Chat Animation for Telegram Bot card
export function ChatAnimation({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] flex-col p-4 gap-2",
        className
      )}
    >
      <motion.div
        className="self-start bg-zinc-800 rounded-lg rounded-tl-none p-2 max-w-[80%]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="h-2 w-12 bg-white/20 rounded mb-1" />
        <div className="h-2 w-24 bg-white/10 rounded" />
      </motion.div>
      
      <motion.div
        className="self-end bg-electric-blue/20 rounded-lg rounded-tr-none p-2 max-w-[80%]"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="h-2 w-20 bg-electric-blue/40 rounded mb-1" />
        <div className="h-2 w-16 bg-electric-blue/20 rounded" />
      </motion.div>
      
      <motion.div
        className="self-start bg-zinc-800 rounded-lg rounded-tl-none p-2 max-w-[80%]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <div className="h-2 w-28 bg-white/20 rounded" />
      </motion.div>
    </div>
  );
}
