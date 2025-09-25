"use client";

import React, { useState } from "react";
import { Plus, Dumbbell, Clock, Target, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkoutSelectionModal from "./WorkoutSelectionModal";
import WorkoutDetailModal from "./WorkoutDetailModal";
import { workouts } from "@/constants";

const WorkoutManagement = () => {
  

  // Modal states
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");

  const handleCreateWorkout = () => {
    setIsSelectionModalOpen(true);
  };

  const handleSelectWorkout = (workoutType: string) => {
    setSelectedWorkoutType(workoutType);
    setIsDetailModalOpen(true);
  };

  const closeAllModals = () => {
    setIsSelectionModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedWorkoutType("");
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Workout Management
        </h2>
        <Button
          onClick={handleCreateWorkout}
          className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="sm:block">Create Workout</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="p-4 sm:p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold">
              Total Workouts
            </h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            {workouts.length}
          </p>
        </div>

        <div className="p-4 sm:p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="text-base sm:text-lg font-semibold">Avg Duration</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary">45min</p>
        </div>

        <div className="p-4 sm:p-6 bg-card border border-border rounded-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-500" />
            <h3 className="text-base sm:text-lg font-semibold">This Week</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary">3</p>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold">Your Workouts</h3>

        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="p-4 sm:p-6 bg-card border border-border rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                  <h4 className="text-base sm:text-lg font-semibold">
                    {workout.name}
                  </h4>
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full w-fit">
                    {workout.type}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {workout.duration} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {workout.exercises} exercises
                  </div>
                  <div className="text-xs sm:text-sm">
                    Last performed: {workout.lastPerformed}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                  Start Workout
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State if no workouts */}
      {workouts.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <Dumbbell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">
            No workouts yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            Create your first workout to get started
          </p>
          <button
            onClick={handleCreateWorkout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 mx-auto w-full sm:w-auto max-w-xs"
          >
            <Plus className="w-4 h-4" />
            Create Your First Workout
          </button>
        </div>
      )}

      {/* Modals */}
      <WorkoutSelectionModal
        isOpen={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        onSelectWorkout={handleSelectWorkout}
      />

      <WorkoutDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeAllModals}
        workoutType={selectedWorkoutType}
      />
    </div>
  );
};

export default WorkoutManagement;
