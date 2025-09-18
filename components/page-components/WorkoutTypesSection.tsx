import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { workoutTypes } from "@/constants";

const WorkoutTypesSection = () => {
  return (
    <section id="workouts" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">
            Find your perfect workout
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you are a beginner or advanced athlete, discover workouts
            tailored to your fitness level and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutTypes.map((workout, i) => (
            <Card
              key={i}
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative">
                <Image
                  src="/img/abstract-geometric-shapes.png"
                  alt={workout.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{workout.name}</h3>
                  <p className="text-sm opacity-90">
                    {workout.users} participants
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutTypesSection;
