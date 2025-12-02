// path: app/about/page.tsx
import React from "react";
import { aboutData } from "@/data/about";
import MissionSection from "@/components/About/MissionSection";
import ValuesGrid from "@/components/About/ValuesGrid";
import PhilosophySection from "@/components/About/PhilosophySection";
import StatsSection from "@/components/About/StatsSection";
import NewsletterSignup from "@/components/Home/NewsletterSignup/NewsletterSignup";

const AboutPage = () => {
  return (
    <div className="overflow-hidden bg-white">
      
      {/* ============ HERO SECTION ============ */}
      {/* ✅ CHANGE: Changed 'h-[80vh]' to 'h-screen' for full screen height */}
      <div className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center fixed-bg" 
          style={{ backgroundImage: `url('${aboutData.hero.image}')` }}
        >
          {/* Dark Overlay - Adjusted opacity for readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Text */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[10vh]">
          <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-6 animate-fadeIn">
            Our Story
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-6 leading-tight drop-shadow-lg">
            {aboutData.hero.title}
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </div>

      {/* ============ SECTIONS ============ */}
      <MissionSection />
      <ValuesGrid />
      <PhilosophySection />
      <StatsSection />
      
      {/* Newsletter */}
      <NewsletterSignup />

    </div>
  );
};

export default AboutPage;