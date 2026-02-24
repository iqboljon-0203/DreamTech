"use client";
import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string; 
  image: string;
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: "p1",
    title: "Luxury Line Perfumes",
    category: "Websites",
    image: "/portfolio/luxlineuae.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Next JS"],
    link: "https://www.luxlineuae.com/"
  },
 
  {
    id: "p2",
    title: "Usat.uz",
    category: "Websites",
    image: "/portfolio/usat_main.png",
    tags: ["React Js", "Next Js", "Supabase","Tailwind CSS"],
    link: "https://usat.uz/"
  },
  {
    id: "p3",
    title: "Oxyzcell",
    category:"Websites",
    image: "/portfolio/oxyzcell.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS", "Next JS", "Supabase"],
    link: "https://oxyzcell.com/"
  },
  {
    id: "p4", 
    title: "Fergana ATX",
    category: "Websites",
    image: "/portfolio/ferganaatx.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS", "Next JS"],
    link: "https://www.ferganaatx.uz/uz"
  },
  {
    id: "p5",
    title: "USAT Journal",
    category: "Websites",
    image: "/portfolio/usat_journal.png",
    tags: ["Next.js", "React"],
    link: "https://journal.usat.uz"
  },
  {
    id: "p6",
    title: "ASSI Tech",
    category: "Websites",
    image: "/portfolio/assitech_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"],
    link: "https://www.assitech.uz/"
  },
  {
    id: "p7",
    title: "TEKGRUP",
    category: "Websites",
    image: "/portfolio/tekgrup_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"],
    link: "https://tekgrup.uz/"
  },
  {
    id: "p8",
    title: "Solo Study",
    category:"Websites",
    image: "/portfolio/solostudy_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"],
    link: "https://solo-study.uz"
  },
  
   {
    id: "p9",
    title: "OkeanMarket",
    category: "Telegram Bot",
    image: "/portfolio/okean_market.png",
    tags: ["React", "Vite", "Supabase", "Telegram Web App"],
    link: "https://t.me/okean_delivery_bot"
  },
  {
    id: "p10",
    title: "MaklerPro",
    category:"Telegram Bot",
    image: "/portfolio/maklerpro.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS", "Supabase", "Telegram API"],
    link: "https://t.me/MaklerProBot"
  },
   {
    id: "p11",
    title: "GeoEducationbot",
    category: "Telegram Bot", // Telegram Bot
    image: "/portfolio/geoeducation_bot.png",
    tags: ["React", "Supabase", "Leaflet", "Telegram API"],
    link: "https://t.me/GeoEducationbot"
  },
];

const categories = ["All", "Websites", "Telegram Bot"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('Portfolio');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse follow effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="group relative rounded-3xl bg-secondary/10 border border-white/5 overflow-hidden flex flex-col h-full"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-secondary/50">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8 flex flex-col flex-grow">
        <div className="mb-auto">
          <span className="text-electric-blue text-sm font-medium mb-2 block">
            {t(`projects.${project.id}.cat`)}
          </span>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
            {project.link ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                title={t('viewCase')}
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            ) : (
               <div className="w-9 h-9" /> 
            )}
          </div>
          
          <p className="text-muted-foreground mb-6 line-clamp-3">
            {t(`projects.${project.id}.desc`)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted-foreground border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const t = useTranslations('Portfolio');
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              {t('description')}
            </p>
          </div>
          
          {/* View All Button Restored */}
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            {t('viewAll')}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                activeCategory === category
                  ? "bg-electric-blue text-white border-electric-blue shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  : "bg-secondary/20 text-muted-foreground border-white/5 hover:bg-secondary/40 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
            <div className="text-center py-20">
                <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            {t('viewAll')}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
