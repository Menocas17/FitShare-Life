"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Exercise = {
    id: string;
    name: string;
    description: string;
    muscle_group: string;
    image_url?: string;
    url_link?: string;
};

export default function ExercisePage(){
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchExercises = async ()=> {
            const { data, error } = await supabase
                .from("excercises")
                .select("*");
            if (!error && data) { 
                setExercises(data as Exercise[]);
                
            }
        };
        fetchExercises();
    }, []);

    const filtered = exercises.filter(ex => 
        ex.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="p6">
            <h1 className="text-2xl font-bold mb-4">Exercises</h1>
            <input 
                type="text"
                placeholder="Search exercise..."
                className="border p-2 rounded w-full mb-6"
                value={search}
                onChange={e => setSearch(e.target.value)} 
            />
            <ul className="space-y-3">
                {filtered.map(ex => (
                    <li key={ex.id}>
                        <Link
                            href={`/exercises/${ex.id}`}
                            className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}