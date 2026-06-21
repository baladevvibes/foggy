"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-[#faf9f5]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#D9A25C]/10 text-[#D9A25C] font-medium">
            Contact Us
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-[#5F6C37]">
            Plan Your Perfect Getaway
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or ready to book your stay?
            Get in touch with us and we'll help you
            create an unforgettable Munnar experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-3xl font-bold text-[#5F6C37] mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5F6C37]/10 flex items-center justify-center">
                  <Phone className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Phone Number
                  </h4>
                  <p className="text-gray-600">
                    +91 93619 24804
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5F6C37]/10 flex items-center justify-center">
                  <Mail className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Email Address
                  </h4>
                  <p className="text-gray-600">
                    info@foggyforest.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5F6C37]/10 flex items-center justify-center">
                  <MapPin className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Location
                  </h4>
                  <p className="text-gray-600">
                    Munnar, Kerala, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#5F6C37]/10 flex items-center justify-center">
                  <Clock className="text-[#5F6C37]" />
                </div>

                <div>
                  <h4 className="font-semibold text-lg">
                    Reception
                  </h4>
                  <p className="text-gray-600">
                    24 Hours Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-3xl font-bold text-[#5F6C37] mb-8">
              Send A Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#5F6C37]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#5F6C37]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#5F6C37]"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-[#5F6C37]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#5F6C37] hover:bg-[#4b5730] text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-[#5F6C37] rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-white">
            Ready To Experience Foggy Forest?
          </h3>

          <p className="text-white/80 mt-4">
            Book your stay today and enjoy the beauty
            of Munnar like never before.
          </p>

          <a
            href="https://wa.me/919361924804"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-[#D9A25C] hover:bg-[#c9934d] text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Book On WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}