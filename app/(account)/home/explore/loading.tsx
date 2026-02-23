import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ExploreLoading() {
  return (
    <div className='container mx-auto max-w-2xl space-y-6 p-4'>
      {/* Search input */}
      <Skeleton className='h-10 w-full rounded-md' />
      {/* Post Creation */}
      <Card className='mb-8'>
        <CardContent className='p-4'>
          <Skeleton className='h-20 w-full rounded-md' />
          <div className='mt-3 flex'>
            <Skeleton className='h-9 w-24' />
          </div>
        </CardContent>
      </Card>

      {/* Post List */}
      {[1, 2, 3].map((i) => (
        <Card key={i} className='overflow-hidden'>
          <CardHeader className='flex flex-row items-center gap-4 space-y-0 p-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-3 w-20' />
            </div>
          </CardHeader>
          <CardContent className='space-y-4 p-4 pt-0'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[90%]' />
            <Skeleton className='h-64 w-full rounded-xl' /> {/* Post image */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
