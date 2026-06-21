"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Gallery",
      href: "#gallery",
    },
    {
      name: "Amenities",
      href: "#amenities",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-[99999] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-[#5F6C37]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#D9A25C] flex items-center justify-center">
                <span className="text-white font-bold">
                  FF
                </span>
              </div>

              <div>
                <h1
                  className={`font-bold text-xl ${
                    scrolled
                      ? "text-[#5F6C37]"
                      : "text-white"
                  }`}
                >
                  Foggy Forest
                </h1>

                <p
                  className={`text-xs ${
                    scrolled
                      ? "text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  Luxury Cottage • Munnar
                </p>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-[#D9A25C] transition ${
                    scrolled
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:9361924804"
                className={`flex items-center gap-2 ${
                  scrolled
                    ? "text-[#5F6C37]"
                    : "text-white"
                }`}
              >
                <Phone size={18} />
                9361924804
              </a>

              <a
                href="https://wa.me/919361924804"
                target="_blank"
                className="bg-[#D9A25C] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                Book Now
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="lg:hidden"
            >
              {isOpen ? (
                <X
                  size={30}
                  className={
                    scrolled
                      ? "text-[#5F6C37]"
                      : "text-white"
                  }
                />
              ) : (
                <Menu
                  size={30}
                  className={
                    scrolled
                      ? "text-[#5F6C37]"
                      : "text-white"
                  }
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white z-[99999] transform transition-transform duration-300 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close */}
          <div className="flex justify-end">
            <button
              onClick={() =>
                setIsOpen(false)
              }
            >
              <X
                size={28}
                className="text-[#5F6C37]"
              />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-5 mt-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-gray-700 font-medium text-lg"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="border-t mt-8 pt-6">
            <a
              href="tel:9361924804"
              className="flex items-center gap-3 text-[#5F6C37] mb-4"
            >
              <Phone size={18} />
              9361924804
            </a>

            <div className="flex items-center gap-3 text-[#5F6C37] mb-6">
              <MapPin size={18} />
              Munnar, Kerala
            </div>

            <a
              href="https://wa.me/919361924804"
              target="_blank"
              className="block text-center bg-[#D9A25C] text-white py-3 rounded-full font-semibold"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}