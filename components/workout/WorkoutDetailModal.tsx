"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Clock, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutDetailModalProps, Exercise, WorkoutData } from "@/types/types";
import { workoutData } from "@/constants";

// Mock data - will be replaced with API calls later
const getWorkoutDetails = (workoutType: string): WorkoutData | null => {
  // Simulate API call

  return workoutData[workoutType] || null;
};

const WorkoutDetailModal = ({
  isOpen,
  onClose,
  workoutType,
}: WorkoutDetailModalProps) => {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && workoutType) {
      // TODO: Replace with actual API call
      const data = getWorkoutDetails(workoutType);
      setWorkoutData(data);
      setSelectedExercises([]);
    }
  }, [isOpen, workoutType]);

  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleCreateWorkout = () => {
    // TODO: Add workout creation logic
    console.log("Creating workout with exercises:", selectedExercises);
    onClose();
  };

  if (!isOpen || !workoutData) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-background shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-semibold">{workoutData.title}</h2>
              <p className="text-muted-foreground">{workoutData.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workout Info */}
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{workoutData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm">{workoutData.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm">
                  {workoutData.exercises.length} exercises
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Target Muscles:</h4>
              <div className="flex flex-wrap gap-2">
                {workoutData.targetMuscles.map((muscle: string) => (
                  <span
                    key={muscle}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Exercises List */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-4">Select Exercises</h3>
            <div className="space-y-3">
              {workoutData.exercises.map((exercise: Exercise) => (
                <div
                  key={exercise.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedExercises.includes(exercise.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleExercise(exercise.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(
                            exercise.difficulty
                          )}`}
                        >
                          {exercise.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exercise.sets} sets</span>
                        <span>{exercise.reps} reps</span>
                        <span>{exercise.rest} rest</span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                        selectedExercises.includes(exercise.id)
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {selectedExercises.includes(exercise.id) && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedExercises.length} exercise
                {selectedExercises.length !== 1 ? "s" : ""} selected
              </span>
              <Button
                onClick={handleCreateWorkout}
                disabled={selectedExercises.length === 0}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Workout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailModal;
