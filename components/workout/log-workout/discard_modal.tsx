import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface DiscardProps {
  handleClose: () => void;
}

export default function DiscardModal({ handleClose }: DiscardProps) {
  //function to discard the training
  function handleDiscard() {
    localStorage.clear();
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-background rounded-lg max-w-4xl w-full md:w-3/5 lg:w-2/5 max-h-[90vh] overflow-y-auto p-5'>
        <div className='flex justify-center'>
          <Image src={'/Sad.svg'} alt='Sad emoticon' height={70} width={70} />
        </div>
        <h3 className='text-2xl font-semibold text-center mt-4'>
          You are about to delete this workout progress
        </h3>

        <p className='text-center mt-4 text-lg'>
          Are you sure you want to discard it?
        </p>

        <div className='flex justify-center mt-8 gap-5'>
          <Link href={'/dashboard'}>
            <Button variant='destructive' onClick={handleDiscard}>
              Discard Workout
            </Button>
          </Link>
          <Button onClick={handleClose}>Continue Workout</Button>
        </div>
      </div>
    </div>
  );
}
