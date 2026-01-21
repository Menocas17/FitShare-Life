import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Json, body_measurements } from '@/types/supabase';

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
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const allData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !uuidRegex.test(key)) continue; // Only process keys that are UUIDs

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
      }) => rest,
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
      },
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

export const parseBodyMeasurements = (
  measurements: body_measurements | null,
) => {
  if (!measurements)
    return console.error('the measurements provided are not valid');
  return [
    { label: 'Chest', key: 'chest', value: measurements.chest ?? 0 },
    { label: 'Waist', key: 'waist', value: measurements.waist ?? 0 },
    { label: 'Hips', key: 'hips', value: measurements.hips ?? 0 },
    { label: 'Thighs', key: 'thighs', value: measurements.thighs ?? 0 },
    { label: 'Biceps', key: 'biceps', value: measurements.biceps ?? 0 },
  ];
};
