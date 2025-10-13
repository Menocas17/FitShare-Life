import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes intelligently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the current year as a string (e.g., "2025").
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Represents a single exercise set.
 */
interface ExerciseSet {
  reps: number;
  weight: number;
  completed?: boolean;
}

/**
 * Represents parsed localStorage data.
 */
interface StoredExercise {
  key: string;
  value: ExerciseSet[];
}

/**
 * Retrieve and process all exercise logs from localStorage.
 * @returns Summary stats and formatted exercise data.
 */
export function getAllData() {
<<<<<<< HEAD
  const allData: StoredExercise[] = [];

  // Collect and parse all valid exercise data
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const rawValue = localStorage.getItem(key);
    if (!rawValue) continue;
=======
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !uuidRegex.test(key)) continue; // Only process keys that are UUIDs

    const value = localStorage.getItem(key!);
>>>>>>> a237486153cdf4c235eedbe5c2d18b4508dd1558

    try {
      const parsedValue: unknown = JSON.parse(rawValue);
      if (Array.isArray(parsedValue)) {
        // Only store arrays of exercise sets
        allData.push({ key, value: parsedValue as ExerciseSet[] });
      }
    } catch (err) {
      console.warn(`Failed to parse localStorage item: ${key}`, err);
    }
  }

  // Format data: extract only reps and weight from sets
  const formatedData = allData.map((item) => ({
    id: item.key,
    sets: item.value.map(({ reps, weight }) => ({ reps, weight })),
  }));

  // Calculate total sets and total lifted weight for completed sets
  let totalWeight = 0;
  let totalSets = 0;

  allData.forEach((exercise) => {
    exercise.value.forEach(({ reps, weight, completed }) => {
      if (completed) {
        totalWeight += reps * weight;
        totalSets += 1;
      }
    });
  });

  return {
    summary: {
      totalWeight,
      totalSets,
    },
    formatedData,
  };
}
