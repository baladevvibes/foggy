"use client";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#D9A25C]/10 text-[#D9A25C] font-medium">
            Our Gallery
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#5F6C37]">
            Explore Foggy Forest
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking mountain views,
            luxury cottages, tea plantations,
            campfires, and unforgettable moments
            captured at Foggy Forest Munnar.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Large Image */}
          <div className="lg:col-span-2 lg:row-span-2">
            <img
              src={images[0]}
              alt=""
              className="w-full h-full min-h-[500px] object-cover rounded-3xl shadow-xl hover:scale-105 transition duration-500"
            />
          </div>

          {images.slice(1).map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-xl"
            >
              <img
                src={img}
                alt=""
                className="w-full h-[240px] object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/919361924804"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#5F6C37] hover:bg-[#4d582d] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
          >
            Book Your Stay
          </a>
        </div>
      </div>
    </section>
  );
}