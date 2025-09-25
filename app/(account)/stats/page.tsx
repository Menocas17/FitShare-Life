"use client";

import React from "react";
import { BarChart3, TrendingUp, Target, Calendar } from "lucide-react";

const StatsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Your Statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Progress */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Weekly Progress</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Workouts Completed</span>
              <span className="font-semibold">5/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: "71%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Monthly Goals */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Monthly Goals</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Target: 20 workouts</span>
              <span className="font-semibold">15/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Total Workouts</h3>
          </div>
          <p className="text-3xl font-bold text-primary">124</p>
          <p className="text-sm text-muted-foreground">+12 this month</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Active Days</h3>
          </div>
          <p className="text-3xl font-bold text-primary">89</p>
          <p className="text-sm text-muted-foreground">This year</p>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold text-primary">7</p>
          <p className="text-sm text-muted-foreground">Days in a row</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
