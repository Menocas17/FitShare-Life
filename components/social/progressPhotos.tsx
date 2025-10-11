'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ProgressPhoto {
  id: string;
  created_at: string;
  profile_id: string;
  date_taken: string;
  photo_url: string;
}

interface ProgressPhotoProps {
  profileId: string;
}

export default function ProgressPhotos({ profileId }: ProgressPhotoProps) {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Mover la función fuera del useEffect
  const fetchPhotos = useCallback (async () => {
    const { data, error } = await supabase
      .from('progress_photos')
      .select('*')
      .eq('profile_id', profileId)
      .order('date_taken', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPhotos(data || []);
    }
  }, [profileId]);

  // 🔹 useEffect solo la llama
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // 🔹 upload a new photo
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const fileName = `${profileId}-${Date.now()}-${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('progress_photos')
        .upload(fileName, file);

      if (storageError) throw storageError;

      const publicUrl = supabase.storage
        .from('progress_photos')
        .getPublicUrl(storageData.path).data.publicUrl;

      const { error: insertError } = await supabase
        .from('progress_photos')
        .insert({
          profile_id: profileId,
          date_taken: new Date().toISOString(),
          photo_url: publicUrl,
        });

      if (insertError) throw insertError;

      // ✅ Ya puedes llamarla aquí sin error
      await fetchPhotos();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 handle delete a photo
  const handleDelete = async (photoId: string, photoUrl: string) => {
    const filePath = photoUrl.split('/').pop();

    await supabase.storage.from('progress_photos').remove([filePath!]);
    await supabase.from('progress_photos').delete().eq('id', photoId);

    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  return (
    <section className='mt-8'>
      <h2 className='text-xl font-semibold mb-4'>Progress Photos</h2>

      <div className='mb-4'>
        <label className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          {loading ? 'Uploading...' : 'Upload Photo'}
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleUpload}
          />
        </label>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {photos.map((photo) => (
          <div key={photo.id} className='relative group'>
            <Image
              src={photo.photo_url}
              alt='Progress'
              width={200}
              height={200}
              className='rounded-lg object-cover'
            />
            <button
              onClick={() => handleDelete(photo.id, photo.photo_url)}
              className='absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded hidden group-hover:block'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
