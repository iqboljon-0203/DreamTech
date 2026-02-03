"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  Send, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowingButton } from "@/components/aceternity/moving-border";

export function ContactSection() {
  const t = useTranslations("Contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = ["website", "webapp", "mobile", "ecommerce", "design", "other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/companydreamtech@gmail.com", {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              name: formState.name,
              email: formState.email,
              _subject: `New Project Request from ${formState.name} (${formState.projectType})`,
              projectType: formState.projectType,
              message: formState.message,
              _template: "table",
              _captcha: "false" 
          })
      });

      if (response.ok) {
          setIsSubmitted(true);
          setFormState({ name: "", email: "", projectType: "", message: "" });
      } else {
          console.error("Form submission failed");
      }
    } catch (error) {
        console.error("Error submitting form:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-deep-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-6">
              <MessageSquare className="w-4 h-4" />
              {t("tag")}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("titlePart1")}{" "}
              <span className="gradient-text">{t("titlePart2")}</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/20 border border-border">
                <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">{t("info.email")}</div>
                <a href="mailto:companydreamtech@gmail.com" className="font-semibold text-lg hover:text-electric-blue transition-colors">
                  companydreamtech@gmail.com
                </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["SC", "MP", "ER"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-deep-purple flex items-center justify-center text-white text-xs font-medium border-2 border-background"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("responseTime")}</p>
                  <p className="text-foreground font-medium">{t("within24h")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t("form.successTitle")}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t("form.successDesc")}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: "", email: "", projectType: "", message: "" });
                    }}
                    className="text-electric-blue hover:underline"
                  >
                    {t("form.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t("form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric-blue transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t("form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric-blue transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                      {t("form.service")}
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formState.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground focus:outline-none focus:border-electric-blue transition-colors appearance-none cursor-pointer pr-10"
                      >
                        <option value="" className="bg-background text-foreground">{t("form.selectType")}</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type} className="bg-background text-foreground">
                            {t(`form.types.${type}`)}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric-blue transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <GlowingButton
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center justify-center gap-2 w-full">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        {t("form.submit")}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                    </span>
                  </GlowingButton>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
