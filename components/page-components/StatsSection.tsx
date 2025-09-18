import React from "react";
import { statsData } from "@/constants";

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="font-semibold">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
