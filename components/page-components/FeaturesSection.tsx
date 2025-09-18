import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { appFeatures, featureCards } from "@/constants";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Everything you need for fitness success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From personalized workouts to community support, we’ve got every
            aspect of your fitness journey covered.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Experience our intuitive app
              </h3>
              <p className="text-lg text-muted-foreground">
                Track your workouts, monitor progress, and stay connected with
                your fitness community all in one beautifully designed app.
              </p>
              <div className="space-y-3">
                {appFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="flex gap-6 justify-center">
                <div className="relative bg-indigo-900/20 rounded-2xl p-4 border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/img/fitness-app-mobile-interface-showing-workout-track.jpg"
                    alt="FitConnect Workout Tracking"
                    width={192}
                    height={320}
                    className="w-48 h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-indigo-500/20 rounded-full blur-lg" />
                </div>
                <div className="relative bg-indigo-900/20 rounded-2xl p-4 border border-indigo-500/20 shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/img/fitness-app-mobile-interface-showing-workout-track.jpg"
                    alt="FitConnect Community Features"
                    width={192}
                    height={320}
                    className="w-48 h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-indigo-400/15 rounded-full blur-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featureCards.map((feature, i) => (
            <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <ul className="space-y-2">
                  {feature.features.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
