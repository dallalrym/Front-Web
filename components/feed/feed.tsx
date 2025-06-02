"use client";

import { useState } from 'react';
import PostItem from '@/components/post/post-item';
import ComposePostBox from '@/components/post/compose-post-box';
import { mockPosts } from '@/lib/mock-data';

export default function Feed() {
  const [posts, setPosts] = useState(mockPosts);

  const addPost = (content: string, media?: string) => {
    const newPost = {
      id: String(Date.now()),
      author: {
        id: 'current-user',
        name: 'Baburrrrr',
        username: 'babur',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        isVerified: false
      },
      content,
      media: media ? [media] : [],
      timestamp: new Date().toISOString(),
      stats: {
        comments: 0,
        reposts: 0,
        likes: 0,
        views: 0
      },
      isLiked: false,
      isReposted: false,
      isBookmarked: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          stats: {
            ...post.stats,
            likes: isLiked ? post.stats.likes + 1 : post.stats.likes - 1
          }
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isReposted = !post.isReposted;
        return {
          ...post,
          isReposted,
          stats: {
            ...post.stats,
            reposts: isReposted ? post.stats.reposts + 1 : post.stats.reposts - 1
          }
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen border-x border-gray-200 dark:border-gray-800">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      <ComposePostBox onSubmit={addPost} />

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post} 
            onLike={() => handleLike(post.id)}
            onRepost={() => handleRepost(post.id)}
            onBookmark={() => handleBookmark(post.id)}
          />
        ))}
      </div>
    </div>
  );
}