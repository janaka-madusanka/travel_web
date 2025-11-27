// path: components/Services/ServiceImageGrid.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { serviceGridData } from '@/data/serviceImageGrid';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const ServiceImageGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="w-[90%] md:w-[85%] xl:w-[75%] mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3">
            Visual Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
            More of Scenic Cottage
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {serviceGridData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden group ${item.span}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              
              {/* ✅ CONDITIONAL RENDERING */}
              {/* If it's a Text Card */}
              {item.type === 'text' ? (
                <div className="w-full h-full bg-[#1a1a1a] flex flex-col justify-center items-center p-8 text-center">
                  <FaQuoteLeft className="text-orange-500 text-3xl mb-4 opacity-50" />
                  <p className="text-white font-serif text-xl md:text-2xl leading-relaxed italic">
                    "{item.text}"
                  </p>
                  <div className="w-12 h-1 bg-orange-500 mt-6 rounded-full"></div>
                </div>
              ) : (
                /* Else render the Image Card */
                <>
                  <Image
                    src={item.image!}
                    alt={item.alt!}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-end p-6">
                    <p className="text-white font-medium text-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {item.alt}
                    </p>
                  </div>
                </>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceImageGrid;