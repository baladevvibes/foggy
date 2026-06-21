"use client";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#5F6C37] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#D9A25C] flex items-center justify-center">
                <span className="font-bold text-lg">
                  FF
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  Foggy Forest
                </h3>
                <p className="text-sm text-white/70">
                  Luxury Cottage • Munnar
                </p>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed">
              Experience luxury, comfort and
              breathtaking mountain views in the
              heart of Munnar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-semibold mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-[#D9A25C]">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-[#D9A25C]">
                  About
                </a>
              </li>

              <li>
                <a href="#gallery" className="hover:text-[#D9A25C]">
                  Gallery
                </a>
              </li>

              <li>
                <a
                  href="#attractions"
                  className="hover:text-[#D9A25C]"
                >
                  Attractions
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-[#D9A25C]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-5">
              Contact Info
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <Phone
                  size={18}
                  className="text-[#D9A25C]"
                />
                <span>
                  +91 93619 24804
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail
                  size={18}
                  className="text-[#D9A25C]"
                />
                <span>
                  info@foggyforest.com
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin
                  size={18}
                  className="text-[#D9A25C]"
                />
                <span>
                  Munnar, Kerala
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xl font-semibold mb-5">
              Book Your Stay
            </h4>

            <p className="text-white/80 mb-5">
              Ready for an unforgettable
              experience in Munnar?
            </p>

            <a
              href="https://wa.me/919361924804"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D9A25C] hover:bg-[#c9934d] px-6 py-3 rounded-full font-semibold transition"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Foggy Forest
            Munnar. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}