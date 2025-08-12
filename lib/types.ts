export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  isVerified: boolean;
  stats: {
    posts: number;
    following: number;
    followers: number;
  };
}

// Interface pour les profils Supabase
export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  cover_photo?: string;
  bio?: string;
  location?: string;
  website?: string;
  join_date?: string;
  is_verified?: boolean;
  following_count?: number;
  followers_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PostStats {
  comments: number;
  reposts: number;
  views: number;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  media?: string[];
  timestamp: string;
  stats: PostStats;
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}