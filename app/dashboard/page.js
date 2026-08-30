"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "/api/auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <h1>Checking authentication...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Welcome {user.name} 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Name
          </h2>

          <p className="text-xl font-bold mt-2">
            {user.name}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Email
          </h2>

          <p className="text-xl font-bold mt-2">
            {user.email}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Account
          </h2>

          <p className="text-xl font-bold mt-2">
            Active
          </p>
        </div>

      </div>

    </div>
  );
}