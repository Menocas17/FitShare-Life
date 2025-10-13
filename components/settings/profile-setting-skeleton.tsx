export default function ProfileSettingSkeleton() {
  return (
    <div className='animate-pulse'>
      {/* Display Name */}
      <label className='block text-sm font-medium mb-2'>Display Name</label>
      <div className='w-full lg:w-3/5 h-9 bg-muted rounded-md mb-4'></div>

      {/* User Name */}
      <label className='block text-sm font-medium mb-2 mt-4'>User name</label>
      <div className='w-full lg:w-3/5 h-9 bg-muted rounded-md mb-4'></div>

      {/* Bio */}
      <label className='block text-sm font-medium mb-2 mt-4'>Bio</label>
      <div className='w-full lg:w-3/5 h-20 bg-muted rounded-md mb-4'></div>

      {/* Height */}
      <label className='block text-sm font-medium mb-2 mt-4'>My Height</label>
      <div className='w-full lg:w-3/5 h-9 bg-muted rounded-md mb-4'></div>

      {/* Weight */}
      <label className='block text-sm font-medium mb-2 mt-4'>
        My current Weight
      </label>
      <div className='w-full lg:w-3/5 h-9 bg-muted rounded-md mb-4'></div>

      {/* Weight Goal */}
      <label className='block text-sm font-medium mb-2 mt-4'>
        My goal Weight
      </label>
      <div className='w-full lg:w-3/5 h-9 bg-muted rounded-md mb-6'></div>

      {/* Body Measurements */}
      <h4 className='mt-6 font-bold'>Body Measurements:</h4>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {/* Chest */}
        <div>
          <label className='block text-sm font-medium mb-2'>Chest</label>
          <div className='w-full h-9 bg-muted rounded-md'></div>
        </div>

        {/* Waist */}
        <div>
          <label className='block text-sm font-medium mb-2'>Waist</label>
          <div className='w-full h-9 bg-muted rounded-md'></div>
        </div>

        {/* Hips */}
        <div>
          <label className='block text-sm font-medium mb-2'>Hips</label>
          <div className='w-full h-9 bg-muted rounded-md'></div>
        </div>

        {/* Thighs */}
        <div>
          <label className='block text-sm font-medium mb-2'>Thighs</label>
          <div className='w-full h-9 bg-muted rounded-md'></div>
        </div>
      </div>

      {/* Save button skeleton */}
      <div className='mt-8 w-32 h-10 bg-muted rounded-md'></div>
    </div>
  );
}
