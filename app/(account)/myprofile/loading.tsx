import { Skeleton } from '@/components/ui/skeleton';

export default function MyProfileLoading() {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Information Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
          <div className="flex flex-col gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-5">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-64 ml-3" />
            </div>
          </div>
          <Skeleton className="h-10 w-28" />
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-2 sm:p-3 bg-muted/50 rounded-lg">
              <Skeleton className="h-6 w-8 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Physical Stats Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 border border-border rounded-lg"
            >
              <Skeleton className="w-5 h-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Photos Section Skeleton */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-48 h-64 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* My Posts Card Skeleton */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="h-96 p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Leaderboard Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
