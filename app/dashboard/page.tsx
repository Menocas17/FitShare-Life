"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/sessions");
      const data = await res.json();
      if (!data.user) {
        router.push("/login"); 
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); 
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-6">Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
