'use client';
import { useState, useTransition } from 'react';
import { Plus, Send } from 'lucide-react';
import { createSocialPost } from '@/lib/server_actions/social';
import { toast } from 'sonner';

export default function PostCreation({ profile_id }: { profile_id: string }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    startTransition(async () => {
      try {
        const newPost = await createSocialPost(profile_id, newPostContent);
        if (newPost?.error) {
          toast.error(newPost.error);
          return;
        }

        toast.success('Post was published successfully');
        setNewPostContent('');
        setShowCreatePost(false);
      } catch (error) {
        toast.error('There was an error posting, try again');
        console.error('Error creating post:', error);
      }
    });
  };

  return (
    <div className='bg-card border-2 border-primary/20 rounded-lg p-6 shadow-sm mb-4 w-full sm:w-4/5 xl:w-3/5 m-auto'>
      <div className='mb-3'>
        <h3 className='text-lg font-semibold text-foreground'>
          Create New Post
        </h3>
        <p className='text-sm text-muted-foreground'>
          Share your workout achievements with the community
        </p>
      </div>
      {!showCreatePost ? (
        <button
          onClick={() => setShowCreatePost(true)}
          className='w-full lg:w-auto flex items-center gap-1 p-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg transition-colors'
        >
          <Plus className='w-5 h-5 text-primary' />
          <span className='text-primary font-medium'>
            Share workout progress...
          </span>
        </button>
      ) : (
        <form onSubmit={handleCreatePost} className='space-y-4'>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder='Share your workout achievements, tips, or motivation...'
            className='w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary'
            rows={4}
            maxLength={500}
            disabled={isPending}
          />
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>
              {newPostContent.length}/500 characters
            </span>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => {
                  setShowCreatePost(false);
                  setNewPostContent('');
                }}
                className='px-4 py-2 text-muted-foreground hover:text-foreground hover:border rounded-lg transition-colors'
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={!newPostContent.trim() || isPending}
                className='px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              >
                {isPending ? (
                  <>
                    <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin'></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4' />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
