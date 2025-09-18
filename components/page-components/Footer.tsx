import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Share2, Users, MessageCircle } from "lucide-react";
import { footerLinks, appInfo } from "@/constants";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{appInfo.footerName}</span>
            </div>
            <p className="text-muted-foreground">{appInfo.description}</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex gap-4">
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 p-0 bg-transparent"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 p-0 bg-transparent"
              >
                <Users className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 p-0 bg-transparent"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {appInfo.currentYear} {appInfo.footerName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
