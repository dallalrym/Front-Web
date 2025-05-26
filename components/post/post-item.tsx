"use client";

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Heart, MessageCircle, Repeat, Share, Bookmark, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostItemProps {
  post: Post;
  onLike: () => void;
  onRepost: () => void;
  onBookmark: () => void;
}

export default function PostItem({ post, onLike, onRepost, onBookmark }: PostItemProps) {
  const [showComments, setShowComments] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { 
    addSuffix: true,
    locale: fr
  });

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <div className="flex">
        <Link href={`/profile/${post.author.username}`} className="mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 object-cover"
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <Link href={`/profile/${post.author.username}`} className="font-bold hover:underline mr-1">
              {post.author.name}
            </Link>
            
            {post.author.isVerified && (
              <span className="text-primary">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g>
                </svg>
              </span>
            )}
            
            <span className="text-gray-500 text-sm ml-1">@{post.author.username}</span>
            <span className="text-gray-500 text-sm mx-1">·</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-auto p-0 h-8 w-8 rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Not interested in this Tweet
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Follow @{post.author.username}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Mute @{post.author.username}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Block @{post.author.username}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Report Tweet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-1">
            <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">{post.content}</p>
          </div>

          {post.media && post.media.length > 0 && (
            <div className="mt-3 rounded-2xl overflow-hidden">
              <img 
                src={post.media[0]} 
                alt="Post media" 
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
          )}

          <div className="mt-3 flex justify-between max-w-md">
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center text-gray-500 hover:text-primary group"
            >
              <div className="p-2 rounded-full group-hover:bg-primary/10">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm ml-1">{post.stats.comments}</span>
            </button>

            <button 
              onClick={onRepost}
              className={cn(
                "flex items-center group",
                post.isReposted ? "text-green-500" : "text-gray-500 hover:text-green-500"
              )}
            >
              <div className={cn(
                "p-2 rounded-full", 
                post.isReposted ? "bg-green-500/10" : "group-hover:bg-green-500/10"
              )}>
                <Repeat className="w-5 h-5" />
              </div>
              <span className="text-sm ml-1">{post.stats.reposts}</span>
            </button>

            <button 
              onClick={onLike}
              className={cn(
                "flex items-center group",
                post.isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
              )}
            >
              <div className={cn(
                "p-2 rounded-full", 
                post.isLiked ? "bg-pink-500/10" : "group-hover:bg-pink-500/10"
              )}>
                <Heart className={cn("w-5 h-5", post.isLiked && "fill-pink-500")} />
              </div>
              <span className="text-sm ml-1">{post.stats.likes}</span>
            </button>

            <button 
              onClick={onBookmark}
              className={cn(
                "flex items-center group",
                post.isBookmarked ? "text-primary" : "text-gray-500 hover:text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-full", 
                post.isBookmarked ? "bg-primary/10" : "group-hover:bg-primary/10"
              )}>
                <Bookmark className={cn("w-5 h-5", post.isBookmarked && "fill-primary")} />
              </div>
            </button>

            <button className="flex items-center text-gray-500 hover:text-primary group">
              <div className="p-2 rounded-full group-hover:bg-primary/10">
                <Share className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}