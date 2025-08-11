"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostItem from '@/components/post/post-item';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from '@/lib/types';
import { useProfile } from '@/hooks/useProfile';

interface UserProfileProps {
  user: Profile;
  userEmail?: string;
}

export default function UserProfile({ user, userEmail }: UserProfileProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [postsLoading, setPostsLoading] = useState(true);
  const { profile, loading, error } = useProfile(user.username);

  useEffect(() => {
    const supabase = createClientComponentClient();

    async function fetchPosts() {
      try {
        setPostsLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('username', user.username)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setPosts(data);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des posts:', err);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchPosts();
  }, [user.username]);

  const handleRepost = async (postId: string) => {
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
    // TODO : Update dans Supabase si tu veux persister
  };

  const handleBookmark = async (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
    // TODO : Update dans Supabase si tu veux persister
  };

  // Affichage du chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement du profil...</span>
        </div>
      </div>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Erreur</h2>
          <p className="text-gray-600">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  // Utiliser le profil récupéré par le hook ou le profil passé en props
  const currentProfile = profile || user;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
        <Link href="/" className="mr-5">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{currentProfile.full_name}</h1>
          <p className="text-gray-500 text-sm">{posts.length} posts</p>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="h-48 bg-gray-300 relative">
        {currentProfile.cover_photo && (
          <img src={currentProfile.cover_photo} alt="Cover" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 relative border-b border-gray-200 dark:border-gray-800">
        <div className="absolute -top-16 left-4 border-4 border-white dark:border-black rounded-full overflow-hidden">
          <img 
            src={currentProfile.avatar_url || '/default-avatar.png'}
            alt={currentProfile.full_name} 
            className="w-32 h-32 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/default-avatar.png';
            }}
          />
        </div>

        <div className="flex justify-end pt-2 pb-5">
          <Button variant="outline" className="rounded-full font-bold">
            Follow
          </Button>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-bold">{currentProfile.full_name}</h1>
          <p className="text-gray-500">@{currentProfile.username}</p>
          {userEmail && (
            <p className="text-gray-500 text-sm mt-1">{userEmail}</p>
          )}

          {currentProfile.is_verified && (
            <div className="flex items-center my-1">
              {/* Icône verified */}
              <span className="ml-1 text-sm text-gray-500">Verified</span>
            </div>
          )}

          <p className="my-2">{currentProfile.bio}</p>

          <div className="flex flex-wrap text-sm text-gray-500 gap-y-1">
            {currentProfile.location && (
              <div className="flex items-center mr-4">
                <MapPin size={16} className="mr-1" />
                <span>{currentProfile.location}</span>
              </div>
            )}
            {currentProfile.website && (
              <div className="flex items-center mr-4">
                <LinkIcon size={16} className="mr-1" />
                <a href={currentProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {currentProfile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {currentProfile.join_date && (
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>Joined {currentProfile.join_date}</span>
              </div>
            )}
          </div>

          <div className="flex mt-3 text-sm">
            <Link href={`/profile/${currentProfile.username}/following`} className="mr-4 hover:underline">
              <span className="font-bold">{currentProfile.following_count || 0}</span> Following
            </Link>
            <Link href={`/profile/${currentProfile.username}/followers`} className="hover:underline">
              <span className="font-bold">{currentProfile.followers_count || 0}</span> Followers
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <Tabs defaultValue="posts" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-4 bg-transparent border-b border-gray-200 dark:border-gray-800">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {postsLoading ? (
            <div className="py-10 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-gray-500">Chargement des posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <PostItem
                key={post.id}
                post={post}
                onRepost={() => handleRepost(post.id)}
                onBookmark={() => handleBookmark(post.id)}
              />
            ))
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>Aucun post pour le moment</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies">
          <div className="py-10 text-center text-gray-500">
            <p>Aucune réponse pour le moment</p>
          </div>
        </TabsContent>

        <TabsContent value="highlights">
          <div className="py-10 text-center text-gray-500">
            <p>Aucun highlight pour le moment</p>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="p-4">
            {posts.filter(p => p.media_url).length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {posts.filter(p => p.media_url).map(post => (
                  <div key={post.id} className="aspect-square overflow-hidden">
                    <img src={post.media_url} alt="Media" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-gray-500">
                <p>Aucun média pour le moment</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
