import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function UserProfileLoading() {
  return (
    <div className=' mx-auto  p-4 space-y-8'>
      {/* Cabecera del Perfil */}
      <div className='flex flex-col items-center gap-4 md:flex-row md:items-start'>
        <Skeleton className='h-24 w-24 md:h-32 md:w-32 rounded-full' />
        <div className='flex-1 space-y-3 text-center md:text-left'>
          <Skeleton className='mx-auto h-8 w-48 md:mx-0' />
          <Skeleton className='mx-auto h-4 w-48 max-w-md md:mx-0' />

          <Skeleton className='h-5 w-20' />
        </div>
        <Skeleton className='h-10 w-32 rounded-md' />
      </div>
      <Skeleton className='h-5 w-72' />
      {/* Tabs de contenido (Posts / Fotos / Stats) */}
      <div className='space-y-4 '>
        <div className='flex gap-2 border-b pb-2 justify-center'>
          <Skeleton className='h-20 w-52' />
          <Skeleton className='h-20 w-52' />
          <Skeleton className='h-20 w-52' />
        </div>

        {/* Grid de contenido (Simulando fotos o posts) */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className='aspect-square overflow-hidden'>
              <Skeleton className='h-full w-full' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
