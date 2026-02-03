"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full select-none" // Added select-none to prevent text selection while dragging
    >
      <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 h-full shadow-sm hover:shadow-md flex flex-col justify-between">
        <div>
           {/* Quote icon */}
          <Quote className="w-10 h-10 text-electric-blue/20 mb-4" />
          
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          
          {/* Content */}
          <p className="text-foreground/90 leading-relaxed mb-6">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-deep-purple flex items-center justify-center text-white font-semibold text-sm shrink-0">
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-medium text-foreground">{testimonial.author}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-blue/5 to-deep-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
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

  // Mouse Event Handlers for Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const testimonials: Testimonial[] = [
    {
      id: "1",
      content: t("reviews.review1.content"),
      author: "Mohinur Quvondiqova",
      role: t("reviews.review1.role"),
      company: "SoloStudy",
      avatar: "MQ",
      rating: 5,
    },
    {
      id: "2",
      content: t("reviews.review2.content"),
      author: "Toxirova Mahbuba",
      role: t("reviews.review2.role"),
      company: "ADTU",
      avatar: "TM",
      rating: 5,
    },
    {
      id: "3",
      content: t("reviews.review3.content"),
      author: "Muhammadyozub Umarov",
      role: t("reviews.review3.role"),
      company: "Okean Supermarket",
      avatar: "MU",
      rating: 5,
    },
    {
      id: "4",
      content: t("reviews.review4.content"),
      author: "Prof. Zumrad G'aibnazarova",
      role: t("reviews.review4.role"),
      company: "USAT University",
      avatar: "ZG",
      rating: 5,
    },
    {
      id: "5",
      content: t("reviews.review5.content"),
      author: "Bekzod Aliyev",
      role: t("reviews.review5.role"),
      company: "ASSI Tech",
      avatar: "BA",
      rating: 5,
    },
    {
      id: "6",
      content: t("reviews.review6.content"),
      author: "Dilnoza Usmonova",
      role: t("reviews.review6.role"),
      company: "TEKGRUP",
      avatar: "DU",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden border-t border-white/5 bg-secondary/5">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-deep-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left max-w-2xl"
            >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg">
                {t("description")}
            </p>
            </motion.div>

             {/* Navigation Buttons */}
            <div className="flex gap-3">
                <button 
                    onClick={() => scroll('left')} 
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => scroll('right')} 
                    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Testimonials Slider */}
        <div 
            ref={scrollRef}
            className={cn(
              "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4 md:mx-0 md:px-0",
              isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
            )}
            style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none' 
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
          {testimonials.map((testimonial, index) => (
            <div 
                key={testimonial.id} 
                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start"
            >
                <TestimonialCard 
                    testimonial={testimonial} 
                    index={index} 
                />
            </div>
          ))}
        </div>

        {/* Trust Badges */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-6">{t("trusted")}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["SoloStudy", "ADTU", "OkeanMarket", "USAT", "ASSI Tech", "TEKGRUP"].map((company) => (
                <span key={company} className="text-xl font-bold text-foreground/80 hover:text-foreground transition-colors cursor-default select-none">
                  {company}
                </span>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
