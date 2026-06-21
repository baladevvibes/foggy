"use client";

import {
  Mountain,
  Trees,
  Camera,
  Waves,
  MapPin,
  Sunrise,
} from "lucide-react";

export default function Attractions() {
  const attractions = [
    {
      icon: <Sunrise size={30} />,
      title: "Kolukkumalai Sunrise",
      distance: "12 KM",
      desc: "Witness one of the highest tea plantations and breathtaking sunrise views.",
    },
    {
      icon: <Mountain size={30} />,
      title: "Top Station",
      distance: "22 KM",
      desc: "A scenic viewpoint offering panoramic views of the Western Ghats.",
    },
    {
      icon: <Waves size={30} />,
      title: "Mattupetty Dam",
      distance: "15 KM",
      desc: "A peaceful destination for boating and enjoying mountain scenery.",
    },
    {
      icon: <Camera size={30} />,
      title: "Echo Point",
      distance: "18 KM",
      desc: "A famous tourist attraction where your voice echoes through the hills.",
    },
    {
      icon: <Trees size={30} />,
      title: "Tea Plantations",
      distance: "Nearby",
      desc: "Explore endless green tea gardens and beautiful walking trails.",
    },
    {
      icon: <MapPin size={30} />,
      title: "Tea Museum",
      distance: "8 KM",
      desc: "Learn about the history and processing of Munnar's famous tea.",
    },
  ];

  return (
    <section
      id="attractions"
      className="py-24 bg-[#faf9f5]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#D9A25C]/10 text-[#D9A25C] font-medium">
            Explore Munnar
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#5F6C37]">
            Nearby Attractions
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
            Discover the beauty of Munnar with
            breathtaking viewpoints, tea plantations,
            waterfalls, and unforgettable experiences
            just a short drive from Foggy Forest.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#5F6C37]/10 text-[#5F6C37] flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-[#5F6C37]">
                {item.title}
              </h3>

              <span className="inline-block mt-2 text-[#D9A25C] font-semibold">
                {item.distance}
              </span>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}