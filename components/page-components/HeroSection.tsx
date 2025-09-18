import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 lg:pb-32 relative overflow-hidden bg-slate-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="w-fit bg-primary/20 text-primary border-primary/30"
              >
                🔥 Join 50,000+ fitness enthusiasts
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance text-white">
                Transform your fitness journey with our{" "}
                <span className="text-primary">complete platform</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Connect with a thriving fitness community, access diverse
                workout programs, and share your progress. Everything you need
                to achieve your fitness goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-slate-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  50k+ active users
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-medium text-slate-300">
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <Image
                src="/img/muscular-fitness-man-doing-workout-with-dumbbells.jpg"
                alt="Fitness Workout"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
