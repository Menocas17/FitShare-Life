import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface SummaryProps {
  summaryData: {
    totalSets: number;
    totalWeight: number;
  };
  workoutName: string;
}

export default function SummaryModal({
  summaryData,
  workoutName,
}: SummaryProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-background rounded-lg max-w-4xl w-full md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto p-5'>
        <div className='flex flex-col items-center gap-4'>
          <Image
            src={'/Weightlifting.svg'}
            alt='weightlifting icon'
            width={100}
            height={100}
          />
          <div className='flex flex-col items-center'>
            <h3 className='text-2xl font-semibold'>Congratulations!</h3>
            <p>
              You&apos;ve completed{' '}
              <span className='font-bold'>{workoutName}</span>
            </p>
          </div>
        </div>

        <div className='flex gap-6 justify-center mt-5'>
          <div className='p-6 bg-card border border-border rounded-lg flex flex-col items-center'>
            <h3 className='font-bold'>Total Weight</h3>
            <p className='text-xl font-bold text-primary'>
              {summaryData.totalWeight} Kg
            </p>
          </div>

          <div className='p-6 bg-card border border-border rounded-lg flex flex-col items-center'>
            <h3 className='font-bold'>Total Sets</h3>
            <p className='text-xl font-bold text-primary'>
              {summaryData.totalSets}
            </p>
          </div>
        </div>

        <div className='flex justify-center mt-8 gap-5'>
          <Button className='bg-navy'>Share it</Button>
          <Link href={'/dashboard'}>
            <Button>Go home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
