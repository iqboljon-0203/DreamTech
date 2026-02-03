"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: "inherit" }}
      >
        <MovingBorderGradient duration={duration} className={borderClassName} />
      </div>

      <div
        className={cn(
          "relative bg-card border border-transparent flex items-center justify-center w-full h-full text-sm antialiased",
          className
        )}
        style={{ borderRadius: "inherit" }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingBorderGradient({
  duration = 2000,
  className,
}: {
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: duration / 1000,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        inset: "-100%",
        background: `conic-gradient(from 0deg, transparent 0deg, #3b82f6 60deg, #8b5cf6 120deg, transparent 180deg)`,
      }}
      className={cn("", className)}
    />
  );
}

// Glowing button variant
export function GlowingButton({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-8 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300",
        "bg-gradient-to-r from-electric-blue to-deep-purple",
        "hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Outline button with glow on hover
export function OutlineGlowButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-8 py-3 rounded-xl font-semibold text-foreground overflow-hidden",
        "border border-border bg-transparent",
        "hover:border-electric-blue/50 hover:bg-electric-blue/5",
        "transition-all duration-300",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
