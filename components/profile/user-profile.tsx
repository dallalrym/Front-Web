"use client";

import { useState } from 'react';
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostItem from '@/components/post/post-item';
import { User, Post } from '@/lib/types';
import { getUserPosts } from '@/lib/mock-data';
import Link from 'next/link';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const [posts, setPosts] = useState<Post[]>(getUserPosts(user.username));
  const [activeTab, setActiveTab] = useState('posts');

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
        <Link href="/" className="mr-5">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.stats.posts} posts</p>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="h-48 bg-gray-300 relative">
        {user.coverPhoto && (
          <img 
            src={user.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 relative border-b border-gray-200 dark:border-gray-800">
        <div className="absolute -top-16 left-4 border-4 border-white dark:border-black rounded-full overflow-hidden">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 object-cover"
          />
        </div>

        <div className="flex justify-end pt-2 pb-5">
          <Button variant="outline" className="rounded-full font-bold">
            Follow
          </Button>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>

          {user.isVerified && (
            <div className="flex items-center my-1">
              <span className="text-primary">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g>
                </svg>
              </span>
              <span className="ml-1 text-sm text-gray-500">Verified</span>
            </div>
          )}

          <p className="my-2">{user.bio}</p>

          <div className="flex flex-wrap text-sm text-gray-500 gap-y-1">
            {user.location && (
              <div className="flex items-center mr-4">
                <MapPin size={16} className="mr-1" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center mr-4">
                <LinkIcon size={16} className="mr-1" />
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {user.joinDate && (
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>Joined {user.joinDate}</span>
              </div>
            )}
          </div>

          <div className="flex mt-3 text-sm">
            <Link href={`/profile/${user.username}/following`} className="mr-4 hover:underline">
              <span className="font-bold">{user.stats.following}</span> Following
            </Link>
            <Link href={`/profile/${user.username}/followers`} className="hover:underline">
              <span className="font-bold">{user.stats.followers}</span> Followers
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <Tabs defaultValue="posts" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-4 bg-transparent border-b border-gray-200 dark:border-gray-800">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none py-3"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="replies"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none py-3"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            value="highlights"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none py-3"
          >
            Highlights
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none py-3"
          >
            Media
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="divide-y divide-gray-200 dark:divide-gray-800">
          {posts.map(post => (
            <PostItem 
              key={post.id} 
              post={post} 
              onLike={() => handleLike(post.id)}
              onRepost={() => handleRepost(post.id)}
              onBookmark={() => handleBookmark(post.id)}
            />
          ))}
        </TabsContent>
        <TabsContent value="replies">
          <div className="py-10 text-center text-gray-500">
            <p>No replies yet</p>
          </div>
        </TabsContent>
        <TabsContent value="highlights">
          <div className="py-10 text-center text-gray-500">
            <p>No highlights yet</p>
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-1">
              {posts.filter(post => post.media && post.media.length > 0).map(post => (
                <div key={post.id} className="aspect-square overflow-hidden">
                  <img 
                    src={post.media![0]} 
                    alt="Media" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}