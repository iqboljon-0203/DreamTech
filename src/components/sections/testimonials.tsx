"use client";
import React, { useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/premium";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

const clients = [
  "SANY", "Kamafarm", "UPack", "SoloStudy", "ADTU", "USAT", "ASSI Tech", "TEKGRUP",
  "Fergana ATX", "Uuma Group", "Top Agro Vet", "Express Clean", "Oxyzcell", "Luxury Line",
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="flex flex-col h-full p-7 md:p-8 border border-border bg-card select-none">
      <div className="flex items-center justify-between mb-10">
        <span className="eyebrow text-muted-foreground">{"//"}{String(index + 1).padStart(2, "0")}</span>
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-foreground text-foreground" />
          ))}
        </div>
      </div>

      <p className="text-lg font-light leading-relaxed mb-10">&ldquo;{testimonial.content}&rdquo;</p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
        <div className="w-11 h-11 shrink-0 bg-foreground text-background flex items-center justify-center font-mono text-xs">
          {testimonial.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-medium truncate">{testimonial.author}</div>
          <div className="eyebrow text-[11px] text-muted-foreground truncate">
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const testimonials: Testimonial[] = [
    { id: "1", content: t("reviews.review1.content"), author: "Mohinur Quvondiqova", role: t("reviews.review1.role"), company: "SoloStudy", avatar: "MQ", rating: 5 },
    { id: "2", content: t("reviews.review2.content"), author: "Toxirova Mahbuba", role: t("reviews.review2.role"), company: "ADTU", avatar: "TM", rating: 5 },
    { id: "3", content: t("reviews.review3.content"), author: "Muhammadyozub Umarov", role: t("reviews.review3.role"), company: "Okean Supermarket", avatar: "MU", rating: 5 },
    { id: "4", content: t("reviews.review4.content"), author: "Prof. Zumrad G'aibnazarova", role: t("reviews.review4.role"), company: "USAT University", avatar: "ZG", rating: 5 },
    { id: "5", content: t("reviews.review5.content"), author: "Bekzod Aliyev", role: t("reviews.review5.role"), company: "ASSI Tech", avatar: "BA", rating: 5 },
    { id: "6", content: t("reviews.review6.content"), author: "Dilnoza Usmonova", role: t("reviews.review6.role"), company: "TEKGRUP", avatar: "DU", rating: 5 },
  ];

  return (
    <section id="testimonials" className="tone-dark relative pt-24 md:pt-36 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader eyebrow={t("trusted")} title={t("title")} description={t("description")}>
          <div className="flex">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center border border-border hover:border-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center border border-l-0 border-border hover:border-foreground hover:border-l transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionHeader>

        <div
          ref={scrollRef}
          className={cn(
            "no-scrollbar flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory",
            isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="min-w-full md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)] snap-start"
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Client marquee */}
      <div className="mt-24 md:mt-32 border-y border-border py-8 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...clients, ...clients].map((name, i) => (
            <span key={i} className="eyebrow text-[13px] text-foreground/80 px-10 md:px-14 whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
