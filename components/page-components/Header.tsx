import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { navigationLinks, appInfo } from "@/constants";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">{appInfo.name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground font-normal hover:font-bold"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>

          <Button size="sm" onClick={() => router.push("/register")}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
