'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { getSocialPosts } from '@/lib/server_actions/social';
import Image from 'next/image';
import { Heart, Share2, User, Calendar } from 'lucide-react';

interface Posts {
  content: string;
  created_at: string;
  id: string;
  media_url: string | null;
  profiles: {
    id: string;
    user_id: string;
    user_name: string | null;
  };
}

export default function SocialFeed({
  initialPosts,
}: {
  initialPosts: Posts[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || posts.length === 0) return;

    try {
      const lastPost = posts[posts.length - 1];
      const cursor = lastPost.created_at;

      const newPosts = await getSocialPosts(cursor);

      if (!newPosts || newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);

        if (newPosts.length < 5) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [posts, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className='space-y-4 flex flex-col items-center'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow w-full sm:w-4/5 xl:w-3/5 '
        >
          {/* Post Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                <User className='w-5 h-5 text-primary' />
              </div>
              <div>
                <h4 className='font-medium'>
                  {post.profiles.user_name || 'Anonymous'}
                </h4>
                <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                  <Calendar className='w-3 h-3' />
                  {formatDate(post.created_at)}
                </div>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className='mb-4'>
            <p className='whitespace-pre-wrap leading-relaxed'>
              {post.content}
            </p>
            {post.media_url && (
              <div className='mt-4'>
                <Image
                  src={post.media_url}
                  alt='Post media'
                  width={600}
                  height={400}
                  className='w-full max-h-96 object-cover rounded-lg'
                />
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className='flex items-center gap-6 pt-4 border-t border-border'>
            <button className='flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors'>
              <Heart className='w-4 h-4' />
              <span className='text-sm'>Like</span>
            </button>
            <button className='flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors'>
              <Share2 className='w-4 h-4' />
              <span className='text-sm'>Share</span>
            </button>
          </div>
        </div>
      ))}

      {hasMore && (
        <div ref={ref} className='h-10 flex justify-center items-center'>
          Loading...
        </div>
      )}
    </div>
  );
}
