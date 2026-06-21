"use client";

import { Phone, MapPin, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Star
              size={16}
              className="text-[#D9A25C]"
              fill="#D9A25C"
            />
            <span className="text-white text-sm">
              Luxury Cottage in Munnar
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Escape Into The
            <span className="block text-[#D9A25C]">
              Foggy Forest
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
            Experience breathtaking mountain views,
            mist-covered valleys, tea plantations,
            luxury cottages, campfires, and unforgettable
            memories in the heart of Munnar.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://wa.me/919361924804"
              target="_blank"
              className="bg-[#D9A25C] hover:bg-[#c9914d] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Book Your Stay
            </a>

            <a
              href="#about"
              className="border border-white/30 backdrop-blur-md bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Resort
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center gap-2 text-white">
              <Phone size={18} />
              <span>+91 93619 24804</span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <MapPin size={18} />
              <span>Munnar, Kerala</span>
            </div>
          </div>
        </div>
      </div>

      

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 right-8 hidden md:block">
        <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}