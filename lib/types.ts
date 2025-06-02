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

export interface PostStats {
  comments: number;
  reposts: number;
  likes: number;
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