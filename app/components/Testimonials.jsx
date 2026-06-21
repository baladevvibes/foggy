"use client";

import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Arun Kumar",
      location: "Chennai",
      review:
        "One of the best stays in Munnar. The mountain views were breathtaking, and the hospitality was exceptional. Perfect place to relax with family.",
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      review:
        "The cottages were clean, luxurious, and surrounded by beautiful tea plantations. Watching the sunrise from the balcony was unforgettable.",
    },
    {
      name: "Rahul Nair",
      location: "Kochi",
      review:
        "Amazing experience! Campfire, misty mornings, and peaceful surroundings made our vacation truly memorable. Highly recommended.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#D9A25C]/10 text-[#D9A25C] font-medium">
            Guest Reviews
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#5F6C37]">
            What Our Guests Say
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600">
            Discover why travelers choose Foggy Forest
            for unforgettable stays, breathtaking views,
            and warm hospitality in Munnar.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#faf9f5] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-[#D9A25C]/20">
                <Quote size={60} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#D9A25C"
                    className="text-[#D9A25C]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{item.review}"
              </p>

              {/* User */}
              <div className="border-t pt-5">
                <h4 className="font-bold text-[#5F6C37]">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#5F6C37] rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold text-white">
            Ready For Your Munnar Getaway?
          </h3>

          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Join hundreds of happy guests who have
            experienced the beauty, comfort, and
            tranquility of Foggy Forest.
          </p>

          <a
            href="https://wa.me/919361924804"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-[#D9A25C] hover:bg-[#c9934d] text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Book Your Stay
          </a>
        </div>
      </div>
    </section>
  );
}