import { User, Post } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Stas Neprokin',
    username: 'neprokin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    coverPhoto: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Designing Products that Users Love',
    location: 'San Francisco, CA',
    website: 'https://neprokin.com',
    joinDate: 'November 2010',
    isVerified: true,
    stats: {
      posts: 23,
      following: 143,
      followers: 149,
    },
  },
  {
    id: '2',
    name: 'Designsta',
    username: 'designstaaaa',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isVerified: false,
    stats: {
      posts: 56,
      following: 234,
      followers: 1430,
    },
  },
  {
    id: '3',
    name: 'cloutexhibition',
    username: 'cloutexhibition',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isVerified: false,
    stats: {
      posts: 128,
      following: 567,
      followers: 984,
    },
  },
  {
    id: '4',
    name: 'CreativePhoto',
    username: 'creativephoto',
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isVerified: true,
    stats: {
      posts: 342,
      following: 450,
      followers: 22400,
    },
  },
  {
    id: '5',
    name: 'Modest Mitkus',
    username: 'modestmitkus',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isVerified: false,
    stats: {
      posts: 78,
      following: 345,
      followers: 1256,
    },
  },
  {
    id: '6',
    name: 'Babur',
    username: 'babur',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    isVerified: false,
    stats: {
      posts: 45,
      following: 213,
      followers: 782,
    },
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Designsta',
      username: 'designsta',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isVerified: false
    },
    content: 'Rdv dans le parc ce soir pour une séance de crossfit',
    timestamp: '2023-05-15T14:00:00Z',
    stats: {
      comments: 10,
      reposts: 1,
      likes: 8,
      views: 324
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'cloutexhibition',
      username: 'cloutexhibition',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isVerified: false
    },
    content: 'YIIP datasciencg by ytje szcon hen cz chhyopag yehnojda. Mentsoik davomida talda va yengj fehsznfanih knejrpaejann bo n9 hjwesrd bc hat oatsm.',
    timestamp: '2023-05-14T10:30:00Z',
    stats: {
      comments: 3,
      reposts: 5,
      likes: 9,
      views: 527
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: '3',
    author: {
      id: '4',
      name: 'CreativePhoto',
      username: 'creativephoto',
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isVerified: true
    },
    content: "Venez manger dans mon restau dans le centre ville. Il y a une promotion pour les braves aujourd'hui !",
    media: ['https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
    timestamp: '2023-05-13T21:15:00Z',
    stats: {
      comments: 15,
      reposts: 7,
      likes: 42,
      views: 1203
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: '4',
    author: {
      id: '1',
      name: 'Stas Neprokin',
      username: 'neprokin',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isVerified: true
    },
    content: 'Just launched our new product! Check it out at neprokin.com/latest',
    media: ['https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
    timestamp: '2023-05-12T16:45:00Z',
    stats: {
      comments: 24,
      reposts: 18,
      likes: 76,
      views: 3402
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  },
  {
    id: '5',
    author: {
      id: '5',
      name: 'Modest Mitkus',
      username: 'modestmitkus',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      isVerified: false
    },
    content: 'Everyone should own products that earn $10,000/month.\n\nUnfortunately, most people have no idea how...\n\nHere\'s my tested blueprint to go from $0 → $10,000/month:',
    media: ['https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
    timestamp: '2023-05-11T09:20:00Z',
    stats: {
      comments: 32,
      reposts: 53,
      likes: 147,
      views: 5698
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false
  }
];

// Helper functions
export function getMockUserByUsername(username: string): User | undefined {
  return mockUsers.find(user => user.username === username);
}

export function getUserPosts(username: string): Post[] {
  return mockPosts.filter(post => post.author.username === username);
}