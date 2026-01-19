'use client';

import { useState, useTransition } from 'react';
import { followUser, unfollowUser } from '@/lib/server_actions/user_search';
import { Button } from '@/components/ui/button';

type Props = {
  loggedProfileId: string | undefined;
  targetUserId: string | undefined;
  isFollowing: boolean;
};

export default function FollowButton({
  loggedProfileId,
  targetUserId,
  isFollowing,
}: Props) {
  const [isFollowed, setIsFollowed] = useState(isFollowing);

  const [isPending, startTransition] = useTransition();

  const handleToggleFollow = () => {
    const newState = !isFollowed;
    setIsFollowed(newState);

    startTransition(async () => {
      try {
        if (newState) {
          await followUser(loggedProfileId, targetUserId);
        } else {
          await unfollowUser(loggedProfileId, targetUserId);
        }
      } catch (error) {
        //revert state in case there is an error in the server aciton
        setIsFollowed(!newState);
        console.error('Error al seguir usuario:', error);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      className={`md:w-40 transition-all ${
        isFollowed
          ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
          : 'bg-primary'
      }`}
      onClick={handleToggleFollow}
    >
      {isFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
