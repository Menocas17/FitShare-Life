import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
//function to get all the exercises logs from the local storage
export function getAllData() {
  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key!);

    try {
      const parsedValue = JSON.parse(value!);
      allData.push({ key, value: parsedValue });
    } catch (err) {
      console.log(err);
      allData.push({ key, value });
    }
  }

  const formatedData = allData.map((item) => ({
    id: item.key as string,
    sets: item.value.map(
      ({
        completed,
        ...rest
      }: {
        completed?: boolean;
        reps: number;
        weight: number;
      }) => rest
    ),
  }));

  let totalWeight = 0;
  let totalSets = 0;

  allData.forEach((exercise) => {
    exercise.value.forEach(
      (set: { reps: number; weight: number; completed: boolean }) => {
        if (set.completed === true) {
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
