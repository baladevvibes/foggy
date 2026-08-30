
"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // GET GALLERY FROM API
  // ============================

  const getGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/gallery",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load gallery"
        );
      }

      if (data.success) {
        setImages(data.images || []);
      } else {
        setError(
          data.message ||
            "Failed to load gallery"
        );
      }

    } catch (error) {
      console.error(
        "GALLERY API ERROR:",
        error
      );

      setError(
        "Unable to load gallery"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // API CALL
  // ============================

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ============================
            HEADER
        ============================ */}

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

        {/* ============================
            LOADING
        ============================ */}

        {loading && (
          <div className="text-center py-20">

            <div className="inline-block w-10 h-10 border-4 border-[#5F6C37] border-t-transparent rounded-full animate-spin" />

            <p className="mt-4 text-gray-500">
              Loading gallery...
            </p>

          </div>
        )}

        {/* ============================
            ERROR
        ============================ */}

        {!loading && error && (
          <div className="text-center py-20">

            <p className="text-red-600">
              {error}
            </p>

            <button
              onClick={getGallery}
              className="mt-4 bg-[#5F6C37] text-white px-6 py-3 rounded-full"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ============================
            EMPTY GALLERY
        ============================ */}

        {!loading &&
          !error &&
          images.length === 0 && (
            <div className="text-center py-20">

              <p className="text-gray-500 text-lg">
                No gallery images available.
              </p>

            </div>
          )}

        {/* ============================
            GALLERY GRID
        ============================ */}

        {!loading &&
          !error &&
          images.length > 0 && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* ============================
                  LARGE IMAGE
              ============================ */}

              <div className="lg:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl shadow-xl">

                <img
                  src={images[0].filepath}
                  alt={
                    images[0].title ||
                    "Foggy Forest Gallery"
                  }
                  className="
                    w-full
                    h-full
                    min-h-[500px]
                    object-cover
                    rounded-3xl
                    hover:scale-105
                    transition
                    duration-500
                  "
                />

              </div>

              {/* ============================
                  OTHER IMAGES
              ============================ */}

              {images
                .slice(1)
                .map((image) => (

                  <div
                    key={image._id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      shadow-xl
                    "
                  >

                    <img
                      src={image.filepath}
                      alt={
                        image.title ||
                        "Foggy Forest Gallery"
                      }
                      className="
                        w-full
                        h-[240px]
                        object-cover
                        hover:scale-110
                        transition
                        duration-500
                      "
                    />

                  </div>

                ))}

            </div>

          )}

        {/* ============================
            CTA
        ============================ */}

        <div className="text-center mt-16">

          <a
            href="https://wa.me/919361924804"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              bg-[#5F6C37]
              hover:bg-[#4d582d]
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition-all
              duration-300
            "
          >
            Book Your Stay
          </a>

        </div>

      </div>
    </section>
  );
}

