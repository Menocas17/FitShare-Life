"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Medal, Dumbbell, Weight, Target, Crown } from "lucide-react";
import Image from "next/image";
import {
  getGlobalLeaderboard,
  LeaderboardEntry,
} from "@/lib/server_actions/leaderboard";
import LoadingSpinner from "@/components/ui-kit/LoadingSpinner";

interface GlobalLeaderboardProps {
  currentProfileId: string;
}

const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  currentProfileId,
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<
    "workouts" | "weight" | "sets"
  >("workouts");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getGlobalLeaderboard(currentProfileId, 50);
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching global leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentProfileId]);

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (selectedMetric) {
      case "weight":
        return b.totalWeight - a.totalWeight;
      case "sets":
        return b.totalSets - a.totalSets;
      default:
        return b.totalWorkouts - a.totalWorkouts;
    }
  });

  // Re-assign ranks based on selected metric
  sortedLeaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  const getMetricValue = (entry: LeaderboardEntry) => {
    switch (selectedMetric) {
      case "weight":
        return `${entry.totalWeight.toLocaleString()} lbs`;
      case "sets":
        return `${entry.totalSets.toLocaleString()} sets`;
      default:
        return `${entry.totalWorkouts} workouts`;
    }
  };

  const getMetricIcon = () => {
    switch (selectedMetric) {
      case "weight":
        return <Weight className="w-4 h-4" />;
      case "sets":
        return <Target className="w-4 h-4" />;
      default:
        return <Dumbbell className="w-4 h-4" />;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            Global Leaderboard
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            See how you rank against the entire FitShare Life community
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex gap-1 sm:gap-2 bg-muted p-1 rounded-lg w-full sm:w-auto max-w-full overflow-hidden">
          <button
            onClick={() => setSelectedMetric("workouts")}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md transition-colors flex items-center justify-center gap-1 sm:gap-2 min-w-0 ${
              selectedMetric === "workouts"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Workouts</span>
            <span className="sm:hidden truncate">Work</span>
          </button>
          <button
            onClick={() => setSelectedMetric("weight")}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md transition-colors flex items-center justify-center gap-1 sm:gap-2 min-w-0 ${
              selectedMetric === "weight"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Weight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Weight</span>
            <span className="sm:hidden truncate">Wt</span>
          </button>
          <button
            onClick={() => setSelectedMetric("sets")}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-md transition-colors flex items-center justify-center gap-1 sm:gap-2 min-w-0 ${
              selectedMetric === "sets"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Sets</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      {sortedLeaderboard.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* 2nd Place */}
          <div className="bg-card border border-border rounded-lg p-2 sm:p-4 text-center order-1">
            <div className="flex justify-center mb-1 sm:mb-2">
              <Trophy className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <div className="flex justify-center mb-1 sm:mb-2">
              {sortedLeaderboard[1]?.avatar_url ? (
                <Image
                  src={sortedLeaderboard[1].avatar_url}
                  alt={sortedLeaderboard[1].user_name}
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs sm:text-base">
                  {sortedLeaderboard[1]?.user_name[0]}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-xs sm:text-sm truncate">
              {sortedLeaderboard[1]?.user_name}
            </h3>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {getMetricValue(sortedLeaderboard[1])}
            </p>
            <p className="text-xs text-muted-foreground sm:hidden">
              {selectedMetric === "workouts" &&
                sortedLeaderboard[1]?.totalWorkouts}
              {selectedMetric === "weight" &&
                `${Math.round(sortedLeaderboard[1]?.totalWeight / 1000)}k`}
              {selectedMetric === "sets" && sortedLeaderboard[1]?.totalSets}
            </p>
          </div>

          {/* 1st Place */}
          <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-300 rounded-lg p-2 sm:p-4 text-center order-2">
            <div className="flex justify-center mb-1 sm:mb-2">
              <Crown className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-500" />
            </div>
            <div className="flex justify-center mb-1 sm:mb-2">
              {sortedLeaderboard[0]?.avatar_url ? (
                <Image
                  src={sortedLeaderboard[0].avatar_url}
                  alt={sortedLeaderboard[0].user_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-yellow-300"
                />
              ) : (
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-yellow-500 flex items-center justify-center text-white border-2 border-yellow-300 text-sm sm:text-base">
                  {sortedLeaderboard[0]?.user_name[0]}
                </div>
              )}
            </div>
            <h3 className="font-bold text-xs sm:text-base truncate">
              {sortedLeaderboard[0]?.user_name}
            </h3>
            <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-semibold hidden sm:block">
              {getMetricValue(sortedLeaderboard[0])}
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold sm:hidden">
              {selectedMetric === "workouts" &&
                sortedLeaderboard[0]?.totalWorkouts}
              {selectedMetric === "weight" &&
                `${Math.round(sortedLeaderboard[0]?.totalWeight / 1000)}k`}
              {selectedMetric === "sets" && sortedLeaderboard[0]?.totalSets}
            </p>
          </div>

          {/* 3rd Place */}
          <div className="bg-card border border-border rounded-lg p-2 sm:p-4 text-center order-3">
            <div className="flex justify-center mb-1 sm:mb-2">
              <Medal className="w-5 h-5 sm:w-8 sm:h-8 text-amber-600" />
            </div>
            <div className="flex justify-center mb-1 sm:mb-2">
              {sortedLeaderboard[2]?.avatar_url ? (
                <Image
                  src={sortedLeaderboard[2].avatar_url}
                  alt={sortedLeaderboard[2].user_name}
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs sm:text-base">
                  {sortedLeaderboard[2]?.user_name[0]}
                </div>
              )}
            </div>
            <h3 className="font-semibold text-xs sm:text-sm truncate">
              {sortedLeaderboard[2]?.user_name}
            </h3>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {getMetricValue(sortedLeaderboard[2])}
            </p>
            <p className="text-xs text-muted-foreground sm:hidden">
              {selectedMetric === "workouts" &&
                sortedLeaderboard[2]?.totalWorkouts}
              {selectedMetric === "weight" &&
                `${Math.round(sortedLeaderboard[2]?.totalWeight / 1000)}k`}
              {selectedMetric === "sets" && sortedLeaderboard[2]?.totalSets}
            </p>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-3 sm:p-4 border-b border-border">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
            {getMetricIcon()}
            Full Rankings
          </h3>
        </div>

        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {sortedLeaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                entry.isCurrentUser ? "bg-primary/5 border-primary/20" : ""
              }`}
            >
              {/* Rank */}
              <div className="w-6 sm:w-8 flex justify-center flex-shrink-0">
                {entry.rank <= 3 ? (
                  <div className="scale-75 sm:scale-100">
                    {getRankIcon(entry.rank)}
                  </div>
                ) : (
                  <span className="text-xs sm:text-sm text-muted-foreground font-bold">
                    #{entry.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div className="flex-shrink-0">
                {entry.avatar_url ? (
                  <Image
                    src={entry.avatar_url}
                    alt={entry.user_name}
                    width={32}
                    height={32}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs sm:text-sm">
                    {entry.user_name[0]}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <h4 className="font-semibold text-sm sm:text-base truncate">
                    {entry.user_name}
                  </h4>
                  {entry.isCurrentUser && (
                    <span className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {getMetricValue(entry)}
                </p>
              </div>

              {/* Mobile Stats */}
              <div className="flex flex-col items-end text-right sm:hidden">
                <p className="text-xs font-semibold text-foreground">
                  {selectedMetric === "workouts" && entry.totalWorkouts}
                  {selectedMetric === "weight" &&
                    `${Math.round(entry.totalWeight / 1000)}k`}
                  {selectedMetric === "sets" && entry.totalSets}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.totalWorkouts}w
                </p>
              </div>

              {/* Desktop Additional Stats */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <p className="text-xs text-muted-foreground">
                  {entry.totalWorkouts} workouts
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.totalWeight.toLocaleString()} lbs total
                </p>
              </div>
            </div>
          ))}
        </div>

        {sortedLeaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-muted-foreground">
              No leaderboard data available
            </p>
            <p className="text-sm text-muted-foreground">
              Complete some workouts to join the rankings!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
