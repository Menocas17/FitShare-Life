import ExerciseFinder from './ExercisesFinder';
import { X } from 'lucide-react';

export default function FinderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-background rounded-lg max-w-4xl w-full max-h-[90vh] min-h-[700px] overflow-y-auto relative'>
        <div className='sticky top-0 bg-white z-10'>
          <div className='sticky top-0 bg-white z-10 p-6 shadow'>
            <button onClick={onClose} className='absolute top-2 right-5'>
              <X className='w-8 h-8 ' />
            </button>
          </div>
        </div>

        <div>
          <ExerciseFinder />
        </div>
      </div>
    </div>
  );
}
