"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowButton, SectionHeader } from "@/components/ui/premium";

interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
  // Telegram bots have no screenshot; their card renders a chat preview instead
  bot?: { handle: string };
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: "p14",
    title: "SANY Uzbekistan",
    category: "Korporativ",
    image: "/portfolio/sany_uzbekistan.jpg",
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://sanyasia.uz/"
  },
  {
    id: "p19",
    title: "Sanoat AI Prognozi",
    category: "Websites",
    image: "/portfolio/tahlil_loyiha.jpg",
    tags: ["React", "Vite", "Tailwind CSS", "AI"],
    link: "https://tahlil-loyiha.vercel.app/"
  },
  {
    id: "p15",
    title: "Kamafarm Healthcare",
    category: "Korporativ",
    image: "/portfolio/kamafarm.jpg",
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://kamafarm.uz/"
  },
  {
    id: "p16",
    title: "UPack B2B",
    category: "E-commerce",
    image: "/portfolio/upack_b2b.jpg",
    tags: ["Next.js", "React", "Tailwind CSS"],
    link: "https://upackb2b.uz/"
  },
  {
    id: "p20",
    title: "Toshkent Service",
    category: "Websites",
    image: "/portfolio/toshkent_service.jpg",
    tags: ["Next.js", "React", "Vercel"],
    link: "https://toshkentservice.uz/"
  },
  {
    id: "p12",
    title: "Siete Viajes Silk Road",
    category: "Websites",
    image: "/portfolio/siete_silkroad.png",
    tags: ["React", "Next JS", "Tailwind CSS", "i18n"],
    link: "https://www.sieteviajessilkroad.com/"
  },
  {
    id: "p4",
    title: "Fergana ATX",
    category: "Korporativ",
    image: "/portfolio/ferganaatx.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS", "Next JS"],
    link: "https://www.ferganaatx.uz/uz"
  },
  {
    id: "p1",
    title: "Luxury Line Perfumes",
    category: "E-commerce",
    image: "/portfolio/luxlineuae.png",
    tags: ["HTML", "CSS", "JavaScript", "React", "Next JS"],
    link: "https://www.luxlineuae.com/"
  },
  {
    id: "p13",
    title: "Uuma Group",
    category: "E-commerce",
    image: "/portfolio/uuma_group.png",
    tags: ["React", "Next JS", "Supabase", "Tailwind CSS"],
    link: "https://www.uumagroup.uz/"
  },
  {
    id: "p18",
    title: "Top Agro Vet",
    category: "E-commerce",
    image: "/portfolio/top_agro_vet.jpg",
    tags: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    link: "https://topagrovet.uz/"
  },
  {
    id: "p17",
    title: "Express Clean",
    category: "Websites",
    image: "/portfolio/express_clean.jpg",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    id: "p2",
    title: "Usat.uz",
    category: "Websites",
    image: "/portfolio/usat_main.png",
    tags: ["React Js", "Next Js", "Supabase", "Tailwind CSS"],
    link: "https://usat.uz/"
  },
  {
    id: "p3",
    title: "Oxyzcell",
    category: "Websites",
    image: "/portfolio/oxyzcell.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS", "Next JS", "Supabase"],
    link: "https://oxyzcell.com/"
  },
  {
    id: "p6",
    title: "ASSI Tech",
    category: "Korporativ",
    image: "/portfolio/assitech_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"],
    link: "https://www.assitech.uz/"
  },
  {
    id: "p7",
    title: "TEKGRUP",
    category: "Korporativ",
    image: "/portfolio/tekgrup_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"]
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
    id: "p8",
    title: "Solo Study",
    category: "Websites",
    image: "/portfolio/solostudy_main.png",
    tags: ["HTML", "CSS", "JS", "React JS", "Tailwind CSS"]
  },
  {
    id: "p21",
    title: "Dream Tech",
    category: "Korporativ",
    image: "/portfolio/dream_tech.jpg",
    tags: ["Next.js", "React", "Tailwind CSS", "i18n"],
    link: "https://www.dream-tech.uz/"
  },
  {
    id: "p22",
    title: "ASF Distribution",
    category: "Telegram Bots",
    bot: { handle: "asfdistributionbot" },
    tags: ["Telegram Bot", "Buyurtmalar"],
    link: "https://t.me/asfdistributionbot"
  },
  {
    id: "p23",
    title: "Arenauz",
    category: "Telegram Bots",
    bot: { handle: "Arena_official_bot" },
    tags: ["Telegram Bot", "Mini App"],
    link: "https://t.me/Arena_official_bot"
  },
  {
    id: "p24",
    title: "Pro Hisobchi",
    category: "Telegram Bots",
    bot: { handle: "proh1sobchibot" },
    tags: ["Telegram Bot", "Mini App"],
    link: "https://t.me/proh1sobchibot"
  },
  {
    id: "p25",
    title: "OneGoPost",
    category: "Telegram Bots",
    bot: { handle: "onegopostbot" },
    tags: ["Telegram Bot", "Mini App"],
    link: "https://t.me/onegopostbot"
  }
];

// value = Project.category, key = Portfolio.filters.* translation
const categories = [
  { value: "All", key: "all" },
  { value: "Korporativ", key: "corporate" },
  { value: "E-commerce", key: "ecommerce" },
  { value: "Websites", key: "websites" },
  { value: "Telegram Bots", key: "bots" },
];
const INITIAL_COUNT = 6;

// Chat-style preview used in place of a screenshot for Telegram bot projects
function BotPreview({ title, handle }: { title: string; handle: string }) {
  return (
    <div className="tone-dark dotted absolute inset-0 flex flex-col justify-between p-5 md:p-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 shrink-0 bg-foreground text-background flex items-center justify-center font-mono text-sm">
          {title.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-[15px] truncate">{title}</div>
          <div className="eyebrow text-[11px] text-muted-foreground truncate">@{handle} · bot</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <div className="self-end h-7 w-24 bg-foreground/90" />
        <div className="self-start w-3/4 space-y-1.5 border border-border p-3">
          <div className="h-1.5 w-full bg-foreground/30" />
          <div className="h-1.5 w-2/3 bg-foreground/20" />
        </div>
        <div className="self-start grid grid-cols-2 gap-1.5 w-3/4">
          <div className="h-6 border border-border" />
          <div className="h-6 border border-border" />
        </div>
      </div>
      <div className="eyebrow text-center py-2.5 bg-foreground text-background transition-opacity group-hover:opacity-85">
        /start
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('Portfolio');
  const Wrapper = project.link ? "a" : "div";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper
        {...(project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex flex-col h-full bg-card border border-border hover:border-foreground/30 transition-colors"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-muted">
          {project.bot ? (
            <BotPreview title={project.title} handle={project.bot.handle} />
          ) : project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>

        <div className="flex flex-col flex-grow p-5 md:p-6">
          <div className="eyebrow text-muted-foreground mb-4">
            {"//"}{String(index + 1).padStart(2, "0")} · {t(`projects.${project.id}.cat`)}
          </div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-normal tracking-tight">{project.title}</h3>
            {project.link && (
              <ArrowUpRight className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            )}
          </div>
          <p className="font-mono text-[13px] leading-relaxed text-muted-foreground line-clamp-3 mb-5">
            {t(`projects.${project.id}.desc`)}
          </p>
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 border-t border-border eyebrow text-[11px] text-muted-foreground">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export function PortfolioSection() {
  const t = useTranslations('Portfolio');
  const tNav = useTranslations('Navigation');
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);

  return (
    <section id="portfolio" className="tone-light dotted relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader eyebrow={tNav('portfolio')} title={t('title')} description={t('description')}>
          {/* Category tabs */}
          <div className="flex flex-wrap border border-border self-start md:self-end">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  setShowAll(false);
                }}
                className={cn(
                  "eyebrow px-4 h-10 transition-colors",
                  activeCategory === category.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`filters.${category.key}`)}
              </button>
            ))}
          </div>
        </SectionHeader>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && filteredProjects.length > INITIAL_COUNT && (
          <div className="mt-12 flex items-center justify-between gap-6 flex-wrap">
            <p className="eyebrow text-muted-foreground">
              {visibleProjects.length} / {filteredProjects.length}
            </p>
            <ArrowButton onClick={() => setShowAll(true)}>{t('viewAll')}</ArrowButton>
          </div>
        )}
      </div>
    </section>
  );
}
