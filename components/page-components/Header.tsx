"use client";
import React, {useState} from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X } from "lucide-react";
import { navigationLinks, appInfo } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/**Logo */}
        <Link href="/">        
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">{appInfo.name}</span>
          </div>          
        </Link>
        {/**Links Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground font-normal hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/**Buttons desktop */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
            className="cursor-pointer"
          >
            Sign In
          </Button>

          <Button
            size="sm"
            className="cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Get Started
          </Button>
        </div>
        {/**Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidde p-2"
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/**Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-foreground hover:font-bold"
              onClick={() => setOpen(false)} //close the navigation menu
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => {
                router.push("/login");
                setOpen(false);
              }}
              className="cursor-pointer"
              >
                Sign In
            </Button>
            <Button
              size="sm"
              className="curso-pointer"
              onClick={() => {
                router.push("/register");
                setOpen(false);
              }}
              >
                Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
