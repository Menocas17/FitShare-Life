"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Exercise = {
    id: string;
    name: string;
    description: string;
    muscle_group: string;
    image_url?: string;
    url_link?: string;
};

export default function ExcerciseDetail({params }: { params: { id: string} }) {
    const [exercise, setExercise] = useState<Exercise | null>(null);
    
    useEffect(() => {
        const fetchExercise = async () => {
            const { data, error } = await supabase
                .from("excercises")
                .select("*")
                .eq("id", params.id)
                .single();
            if (!error && data) {
                setExercise(data as Exercise);
            }
        };
        fetchExercise();
    }, [params.id]);

    if (!exercise) return <p className="p-6">Loading...</p>

    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
            {exercise.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img    
                    src={exercise.image_url}
                    alt={exercise.name}
                    className="w-full max-w-md rounded mb-4" />
                
            )}
            <p className="mb-2"><strong>Muscle Group:</strong>{exercise.muscle_group}</p>
            <p className="mb-4"><strong>Description:</strong>{exercise.description}</p>
            {exercise.url_link && (
                <a  
                    href={exercise.url_link}
                    target="_blank"
                    rel="noopener norederrer"
                    className="text-blue-600 underline">
                        More info
                </a>
            )}
        </div>
    );
}