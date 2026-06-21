"use client";

import {
  Trees,
  Mountain,
  Coffee,
  Home,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-[#faf9f5]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop"
              alt="Foggy Forest Resort"
              className="rounded-3xl shadow-2xl h-[500px] w-full object-cover"
            />

            {/* <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-4xl font-bold text-[#D9A25C]">
                5+
              </h3>
              <p className="text-gray-600">
                Years of Hospitality
              </p>
            </div> */}
          </div>

          {/* Content */}
          <div>
            <span className="inline-block bg-[#D9A25C]/15 text-[#D9A25C] px-5 py-2 rounded-full font-medium">
              About Foggy Forest
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-[#5F6C37] leading-tight">
              A Peaceful Escape
              <br />
              Into Nature
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Nestled in the breathtaking hills of
              Munnar, Foggy Forest offers a unique
              blend of luxury, comfort, and nature.
              Wake up to mist-covered mountains,
              fresh air, and panoramic views that
              create unforgettable memories.
            </p>

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Whether you're planning a romantic
              getaway, family vacation, or peaceful
              retreat, our cottages provide the
              perfect environment to relax and
              reconnect with nature.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#5F6C37]/10 rounded-xl flex items-center justify-center">
                  <Mountain className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#5F6C37]">
                    Mountain View
                  </h4>
                  <p className="text-sm text-gray-500">
                    Stunning sunrise scenery
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#5F6C37]/10 rounded-xl flex items-center justify-center">
                  <Trees className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#5F6C37]">
                    Tea Estates
                  </h4>
                  <p className="text-sm text-gray-500">
                    Surrounded by greenery
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#5F6C37]/10 rounded-xl flex items-center justify-center">
                  <Home className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#5F6C37]">
                    Luxury Stay
                  </h4>
                  <p className="text-sm text-gray-500">
                    Premium cottages
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#5F6C37]/10 rounded-xl flex items-center justify-center">
                  <Coffee className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#5F6C37]">
                    Campfire & BBQ
                  </h4>
                  <p className="text-sm text-gray-500">
                    Memorable evenings
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block mt-10 bg-[#5F6C37] hover:bg-[#4d582d] text-white px-8 py-4 rounded-full font-semibold transition"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}