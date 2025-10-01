import { Button } from '../../ui/button';
import React from 'react';

interface logButtonProps {
  clicked: boolean;
  handleToggleSet: () => void;
}

function LogButton({ clicked, handleToggleSet }: logButtonProps) {
  return (
    <Button
      variant='outline'
      className={`text-xl font-extrabold p-2 hover:bg-accent bg-gray-200 ${
        clicked ? 'bg-green-500 text-white hover:bg-green-600' : ''
      }`}
      onClick={handleToggleSet}
    >
      ✓
    </Button>
  );
}

export default React.memo(LogButton);
