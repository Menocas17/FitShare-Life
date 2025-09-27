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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/sessions");
        const data = await res.json();
        if (!data.user) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <p className="mb-6">Email: {user.email}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Workouts Completed</h3>
          <p className="text-3xl font-bold text-primary">24</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Hours Trained</h3>
          <p className="text-3xl font-bold text-primary">48</p>
        </div>
        <div className="p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Streak Days</h3>
          <p className="text-3xl font-bold text-primary">7</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
