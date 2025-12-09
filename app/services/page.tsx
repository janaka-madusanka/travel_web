// path: app/services/page.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { servicesData } from '@/data/services';
import ServiceCard from '@/components/Services/ServiceCard';
import NewsletterSignup from '@/components/Home/NewsletterSignup/NewsletterSignup';
import AmenitiesSection from '@/components/Services/AmenitiesSection';

const ServicesPage = () => {
  return (
    <div className="overflow-hidden">
      {/* SEO Meta Tags */}
      <Head>
        <title>Scenic Cottage Sigiriya - Premium Services & Experiences</title>
        <meta
          name="description"
          content="Discover Scenic Cottage's premium services in Sigiriya, Sri Lanka. Enjoy curated experiences, authentic dining, wildlife safaris, cultural excursions, comfortable rooms, and guided tours for your perfect getaway."
        />
        <meta
          name="keywords"
          content="
          Sigiriya hotel services, hotel near Sigiriya Rock, luxury hotel Sigiriya, low-budget hotel Sri Lanka, Sigiriya tourism,
          guided tours Sigiriya, cultural excursions, wildlife safaris, authentic dining Sigiriya, Scenic Cottage amenities,
          family rooms Sigiriya, hotel booking Sri Lanka, best hotels near Sigiriya, hotel with breakfast buffet, organic meals,
          Minneriya National Park, Kaudulla National Park, Sigiriya sightseeing, Sri Lanka cultural triangle
          "
        />
        <link rel="canonical" href="https://www.sceniccottage.com/services" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Scenic Cottage Sigiriya",
              "url": "https://www.sceniccottage.com/services",
              "image": "https://www.sceniccottage.com/images/Services/service-hero.jpg",
              "description": "Scenic Cottage Sigiriya offers premium services including curated experiences, authentic dining, guided cultural tours, and wildlife safaris for a memorable stay in Sigiriya, Sri Lanka.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sigiriya Road, Inamaluwa",
                "addressLocality": "Sigiriya",
                "postalCode": "21124",
                "addressCountry": "LK"
              },
              "telephone": "+94740558858",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 7.9569,
                "longitude": 80.7608
              },
              "priceRange": "$$",
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Family Rooms" },
                { "@type": "LocationFeatureSpecification", "name": "Double Rooms" },
                { "@type": "LocationFeatureSpecification", "name": "Room Service" },
                { "@type": "LocationFeatureSpecification", "name": "Organic Dining" },
                { "@type": "LocationFeatureSpecification", "name": "Wildlife Safaris" },
                { "@type": "LocationFeatureSpecification", "name": "Cultural Excursions" },
                { "@type": "LocationFeatureSpecification", "name": "24-Hour Front Desk" }
              ]
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <Image 
          src="/images/Services/service-hero.jpg"
          alt="Scenic Cottage Premium Services Hero Image"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-[10vh]">
          <p className="text-white/90 text-sm sm:text-base font-bold uppercase tracking-[0.3em] mb-6 animate-fadeIn">
            Indulge & Explore
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-8 leading-tight drop-shadow-lg">
            Our Premium Services
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            From curated culinary journeys to guided wilderness adventures, 
            experience the very best of Sigiriya hospitality.
          </p>
        </div>
      </div>

      {/* 1. Curated Experiences */}
      <section className="bg-gray-50 py-24 lg:py-32">
        <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto flex flex-col gap-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6">
              Curated Experiences
            </h2>
            <div className="w-24 h-1 bg-[#007326] mx-auto rounded-full"></div>
          </div>
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* 2. Detailed Amenities Section */}
      <AmenitiesSection />

      {/* 3. Newsletter */}
      <NewsletterSignup />
    </div>
  );
};

export default ServicesPage;
