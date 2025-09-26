'use client';
import { useState } from 'react';
import { Button } from '../../ui/button';

export default function LogButton() {
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      variant='outline'
      className={`text-xl font-extrabold p-2 hover:bg-accent bg-gray-200 ${
        clicked ? 'bg-green-500 text-white hover:bg-green-600' : ''
      }`}
      onClick={() => setClicked(!clicked)}
    >
      ✓
    </Button>
  );
}
