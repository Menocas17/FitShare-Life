import React from "react";
import { sidebarLinks, appInfo } from "@/constants";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border">
        <div className="h-16 flex items-center justify-center border-b border-border font-bold text-lg">
          <Link href="/dashboard">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{appInfo.name}</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
