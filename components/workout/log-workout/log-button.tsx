import { Button } from '../../ui/button';
import React from 'react';

interface logButtonProps {
  clicked: boolean;
  handleToggleSet: () => void;
}

function LogButton({ clicked, handleToggleSet }: logButtonProps) {
  return (
    <Button
      variant='logButton'
      className={clicked ? 'bg-primary text-white hover:bg-green-600' : ''}
      onClick={handleToggleSet}
    >
      ✓
    </Button>
  );
}

export default React.memo(LogButton);
