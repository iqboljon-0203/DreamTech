"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Small 3x2 block glyph shown before eyebrow labels
function BlockGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 8" className={cn("w-3.5 h-2", className)} fill="currentColor" aria-hidden>
      <rect x="0" y="0" width="3" height="3" />
      <rect x="5.5" y="0" width="3" height="3" />
      <rect x="11" y="0" width="3" height="3" />
      <rect x="0" y="5" width="3" height="3" />
      <rect x="5.5" y="5" width="3" height="3" />
      <rect x="11" y="5" width="3" height="3" />
    </svg>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("eyebrow inline-flex items-center gap-2.5 text-muted-foreground", className)}>
      <BlockGlyph />
      <span>{children}</span>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={cn("flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20", className)}>
      <div className="max-w-2xl">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-6">{title}</h2>
        {description && <p className="lead text-muted-foreground max-w-xl">{description}</p>}
      </div>
      {children}
    </Reveal>
  );
}

type ArrowButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  href?: string;
  external?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

// Square "arrow cell + label" button. Solid = foreground fill, outline = hairline.
export function ArrowButton({
  children,
  className,
  variant = "solid",
  href,
  external,
  ...buttonProps
}: ArrowButtonProps) {
  const classes = cn(
    "group inline-flex items-stretch h-11 text-sm font-normal select-none transition-colors",
    "disabled:opacity-50 disabled:pointer-events-none",
    variant === "solid"
      ? "bg-foreground text-background"
      : "border border-foreground/25 text-foreground hover:border-foreground",
    className
  );

  const inner = (
    <>
      <span
        className={cn(
          "flex items-center justify-center w-11 shrink-0 overflow-hidden",
          variant === "solid" ? "border-r border-background/20" : "border-r border-foreground/25"
        )}
      >
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
      <span className="flex items-center px-5 whitespace-nowrap">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button className={classes} {...buttonProps}>
      {inner}
    </button>
  );
}
