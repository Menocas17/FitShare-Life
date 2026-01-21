'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Medal,
  Trophy,
  Crown,
  Dumbbell,
  Weight,
  UserPlus,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FriendsLeaderboardEntry } from '@/lib/server_actions/leaderboard';

const FriendsLeaderboard = ({
  friendsData,
}: {
  friendsData: FriendsLeaderboardEntry[];
}) => {
  const [leaderboard, setLeaderboard] = useState<FriendsLeaderboardEntry[]>(
    friendsData || [],
  );

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getFriendsLeaderboard(currentProfileId, 20);
  //       setLeaderboard(data);
  //     } catch (error) {
  //       console.error('Error fetching friends leaderboard:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, [currentProfileId]);

  useEffect(() => {
    setLeaderboard(friendsData);
  }, [friendsData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className='w-5 h-5 text-yellow-500' />;
      case 2:
        return <Trophy className='w-5 h-5 text-gray-400' />;
      case 3:
        return <Medal className='w-5 h-5 text-amber-600' />;
      default:
        return (
          <span className='text-sm text-muted-foreground font-semibold'>
            #{rank}
          </span>
        );
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className='bg-card border border-border rounded-lg'>
      {/* Header */}
      <div className='p-4 sm:p-6 border-b border-border'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Users className='w-5 h-5 text-primary' />
              Friends Leaderboard
            </h3>
            <p className='text-sm text-muted-foreground'>
              See how you rank among people you follow
            </p>
          </div>
          <Link
            href='/home/explore'
            className='text-sm text-primary hover:text-primary/80 transition-colors'
          >
            Find more friends →
          </Link>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className='p-4 sm:p-6'>
        {leaderboard.length > 0 ? (
          <div className='space-y-3'>
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                  entry.isCurrentUser
                    ? 'bg-primary/5 border-primary/20 shadow-sm'
                    : 'bg-background border-border hover:bg-muted/30'
                }`}
              >
                {/* Rank Badge */}
                <div
                  className={`px-2 py-1 rounded-full border flex items-center justify-center min-w-[2rem] ${getRankBadgeColor(
                    entry.rank,
                  )}`}
                >
                  {entry.rank <= 3 ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className='text-xs font-semibold'>#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className='flex-shrink-0'>
                  {entry.avatar_url ? (
                    <Image
                      src={entry.avatar_url}
                      alt={entry.user_name}
                      width={40}
                      height={40}
                      className='w-10 h-10 rounded-full border-2 border-background'
                    />
                  ) : (
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-semibold border-2 border-background'>
                      {typeof entry.user_name === 'string' &&
                      entry.user_name.length > 0
                        ? entry.user_name[0].toUpperCase()
                        : 'Username?'}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <h4 className='font-semibold text-sm truncate'>
                      {entry.user_name}
                    </h4>
                    {entry.isCurrentUser && (
                      <span className='px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium'>
                        You
                      </span>
                    )}
                  </div>
                  <div className='flex items-center gap-4 mt-1'>
                    <div className='flex items-center gap-1'>
                      <Dumbbell className='w-3 h-3 text-muted-foreground' />
                      <span className='text-xs text-muted-foreground'>
                        {entry.totalWorkouts} workouts
                      </span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Weight className='w-3 h-3 text-muted-foreground' />
                      <span className='text-xs text-muted-foreground'>
                        {entry.totalWeight.toLocaleString()} lbs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className='hidden sm:flex flex-col items-end text-right'>
                  <div className='text-sm font-semibold text-foreground'>
                    {entry.totalWorkouts}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {entry.totalSets} sets
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
              <UserPlus className='w-8 h-8 text-muted-foreground' />
            </div>
            <h4 className='font-semibold text-foreground mb-2'>
              No friends yet
            </h4>
            <p className='text-sm text-muted-foreground mb-4 max-w-sm mx-auto'>
              Follow other users to see how you rank against your friends in
              workouts and achievements.
            </p>
            <Link
              href='/home/explore'
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm'
            >
              <UserPlus className='w-4 h-4' />
              Find Friends
            </Link>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      {leaderboard.length > 0 && (
        <div className='px-4 sm:px-6 pb-4 sm:pb-6'>
          <div className='bg-muted/50 rounded-lg p-3'>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <div className='text-lg font-bold text-foreground'>
                  {leaderboard.length}
                </div>
                <div className='text-xs text-muted-foreground'>Friends</div>
              </div>
              <div>
                <div className='text-lg font-bold text-foreground'>
                  {leaderboard.find((e) => e.isCurrentUser)?.rank || '-'}
                </div>
                <div className='text-xs text-muted-foreground'>Your Rank</div>
              </div>
              <div>
                <div className='text-lg font-bold text-foreground'>
                  {Math.max(...leaderboard.map((e) => e.totalWorkouts))}
                </div>
                <div className='text-xs text-muted-foreground'>Top Score</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsLeaderboard;
