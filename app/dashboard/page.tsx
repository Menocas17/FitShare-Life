"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Home, BarChart3, Settings } from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: Home},
  { href: "/dashboard/stats", label: "Stats", icon: BarChart3},
  { href: "/dashboard/setting", label: "Setting", icon: Settings},
];

const DashboardPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
  } | null>(null);

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
      }catch (err){
        console.error("Failed to fetch session", err);
        router.push("/login");
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
    <div className="flex h-screen bg-background text-foreground">
      {/*Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border">
        <div className="h-16 flex items-center justify-center border-b border-border font-bold text-lg">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
              >
                <link.icon className="w-5 h-5"/>
                {link.label}
              </Link>
          ))}
        </nav>
      </aside>
      {/**Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-background border-r border-border">
            <button
              onClick={() => setOpen(false)}
              className="mb-4 p-2 flex items-center gap-2"
            >
              <X className="space-y-2"/>Close
            </button>
            <nav className="space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                  >
                    <link.icon className="w-5 h-5"/>
                    {link.label}
                  </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
      {/**Main Content */}
      <div className="flex-1 flex flex-col">
        {/**Top Navbar */}
        <header className="h-16 flex items-center justify-between border-b border-border px-6">
          <button 
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name} 👋</h1>
          <div className="flex items-center gap-3">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-8 h-8 rounded-full" 
                />
            ) : (
              <div className="w-8 h8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                {user.name[0]}
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
          </div>
        </header>
        {/**Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font semibold mb=4">
            Welcome, {user.name}
          </h2>
          <p className="mb-6">Email: {user.email}</p>
        </main>
      </div>      
    </div>
  );
};

export default DashboardPage;
