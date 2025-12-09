// path: app/about/page.tsx
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { aboutData } from "@/data/about";
import MissionSection from "@/components/About/MissionSection";
import ValuesGrid from "@/components/About/ValuesGrid";
import PhilosophySection from "@/components/About/PhilosophySection";
import StatsSection from "@/components/About/StatsSection";
import NewsletterSignup from "@/components/Home/NewsletterSignup/NewsletterSignup";

const AboutPage = () => {
  return (
    <div className="overflow-hidden bg-white">
      {/* SEO Meta Tags */}
      <Head>
        <title>About Scenic Cottage Sigiriya - Hotel Near Sigiriya Rock & Dambulla</title>
        <meta 
          name="description" 
          content="Learn about Scenic Cottage Sigiriya – a sustainable cabana hotel near Sigiriya Rock and Dambulla. Rooted in nature, offering luxury and low-budget stays, mindful living, and authentic Sri Lankan hospitality." 
        />
        <meta 
          name="keywords" 
          content="
          Sigiriya hotel, best hotel Sigiriya, Sigiriya Dambulla accommodation, hotel near Sigiriya Rock, Sri Lanka hotel,
          low budget hotel Sri Lanka, luxury hotel Sri Lanka, eco-friendly hotel Sigiriya, sustainable hotel Sri Lanka,
          hotel booking Sigiriya, book hotel Sigiriya, Agoda Sri Lanka, Expedia Sri Lanka, Booking.com Sri Lanka,
          Shangri-La Sri Lanka, Cinnamon Grand, hotels near Dambulla Cave Temple, Sigiriya tourism stay, cabana hotel Sigiriya,
          private cottages Sigiriya, organic hotel Sri Lanka, boutique hotel Sigiriya, stay in Sigiriya, romantic hotel Sigiriya,
          honeymoon hotel Sri Lanka, family friendly hotel Sigiriya, Sigiriya
          " 
        />
        <link rel="canonical" href="https://www.sceniccottage.com/about" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Scenic Cottage Sigiriya",
              "image": [
                "https://www.sceniccottage.com/logo.png",
                aboutData.hero.image
              ],
              "description": "Scenic Cottage Sigiriya – sustainable cabana hotel near Sigiriya Rock and Dambulla. Rooted in nature with luxury and budget rooms, organic gardens, and mindful living.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sigiriya Road, Inamaluwa",
                "addressLocality": "Sigiriya",
                "postalCode": "21124",
                "addressCountry": "LK"
              },
              "telephone": "+94740558858",
              "url": "https://www.sceniccottage.com/about",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 7.9569,
                "longitude": 80.7608
              },
              "priceRange": "$$",
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Organic garden", "value": true },
                { "@type": "LocationFeatureSpecification", "name": "Sustainability practices", "value": true }
              ]
            })
          }}
        />
      </Head>

      {/* ============ HERO SECTION ============ */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={aboutData.hero.image}
            alt={aboutData.hero.title}
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

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
