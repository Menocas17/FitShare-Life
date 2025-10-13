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

  const fetchPhotos = useCallback(async () => {
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

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const fileName = `${profileId}/${Date.now()}-${file.name}`;
      const { error: storageError } = await supabase.storage
        .from('progress_photos')
        .upload(fileName, file, { upsert: true });

      if (storageError) {
        console.error('Error uploading avatar:', storageError);
        return { success: false, message: storageError?.message };
      }

      const { data: urlData } = supabase.storage
        .from('progress_photos')
        .getPublicUrl(fileName);

      console.log(urlData);

      if (urlData) {
        const photoURL = urlData.publicUrl;
        const { error: insertError } = await supabase
          .from('progress_photos')
          .insert({
            profile_id: profileId,
            date_taken: new Date().toISOString(),
            photo_url: photoURL,
          });
        if (insertError) {
          console.error('Error inserting photo link:', insertError);
          return { success: false, message: insertError?.message };
        }
      }

      // ✅ Ya puedes llamarla aquí sin error
      await fetchPhotos();
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error:', err.message);
      } else {
        console.error('Error desconocido:', JSON.stringify(err));
      }
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
    <section className=''>
      <div className='p-4 border-b border-border flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Progress Photos</h2>

        <div className='mb-4'>
          <label className='bg-primary text-primary-foreground shadow-xs hover:bg-[#0ea573] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium py-2 px-4 cursor-pointer'>
            {loading ? 'Uploading...' : 'Upload Photo'}
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-[855px]  p-4'>
        {photos.map((photo) => (
          <div key={photo.id} className='relative group'>
            <div className='w-full h-0 pb-[100%] relative'>
              <Image
                src={photo.photo_url}
                alt='Progress'
                fill
                className='rounded-lg object-cover'
              />
            </div>

            <button
              onClick={() => handleDelete(photo.id, photo.photo_url)}
              className='absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded hidden group-hover:block'
            >
              ✕
            </button>
            <p className='text-sm text-muted-foreground text-center mt-2'>
              {photo.date_taken}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
