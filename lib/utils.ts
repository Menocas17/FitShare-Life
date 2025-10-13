import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get the current year as a string
 * @returns Current year as string (e.g., "2025")
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Retrieve and process all exercise logs from localStorage
 * @returns Summary stats and formatted data
 */
export function getAllData() {
  const allData: { key: string | null; value: any }[] = [];

  // Collect and parse all data from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const rawValue = localStorage.getItem(key);
    if (!rawValue) continue;

    try {
      const parsedValue = JSON.parse(rawValue);
      allData.push({ key, value: parsedValue });
    } catch (err) {
      console.warn(`Failed to parse localStorage item: ${key}`, err);
      allData.push({ key, value: rawValue });
    }
  }

  // Format data: extract only reps and weight from sets
  const formatedData = allData.map((item) => ({
    id: item.key as string,
    sets: Array.isArray(item.value)
      ? item.value.map(
          ({ reps, weight }: { reps: number; weight: number }) => ({
            reps,
            weight,
          })
        )
      : [],
  }));

  // Calculate total sets and weight for completed sets
  let totalWeight = 0;
  let totalSets = 0;

  allData.forEach((exercise) => {
    if (!Array.isArray(exercise.value)) return;

    exercise.value.forEach(
      (set: { reps: number; weight: number; completed?: boolean }) => {
        if (set.completed) {
          totalWeight += set.reps * set.weight;
          totalSets += 1;
        }
      }
    );
  });

  return {
    summary: {
      totalWeight,
      totalSets,
    },
    formatedData,
  };
}
