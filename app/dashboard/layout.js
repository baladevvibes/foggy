"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Gallery",
      path: "/dashboard/gallery",
      icon: "🖼️",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: "👤",
    },
     {
      name: "Videos",
      path: "/dashboard/videos",
      icon: "👤",
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-64
          bg-gray-900
          text-white
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-700">

          <h1 className="text-xl font-bold">
            My Dashboard
          </h1>

        </div>

        {/* Menu */}
        <nav className="p-4">

          <p className="text-xs text-gray-400 uppercase mb-3">
            Menu
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {

              const active =
                pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-lg
                    transition

                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }
                  `}
                >

                  <span className="text-xl">
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>

                </Link>
              );
            })}

          </div>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              text-red-400
              hover:bg-gray-800
            "
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main area */}
      <div className="md:ml-64">

        {/* Top navbar */}
        <header className="h-16 bg-white shadow flex items-center px-4">

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <h2 className="ml-4 font-semibold">
            Dashboard
          </h2>

        </header>

        {/* Page */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}