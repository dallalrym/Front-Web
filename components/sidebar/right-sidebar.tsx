"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const trends = [
    { topic: 'Trending in Germany', tag: 'Revolution', posts: '10K Tweets' },
    { topic: 'Trending in Germany', tag: 'Revolution', posts: '10K Tweets' },
    { topic: 'Trending in Germany', tag: 'Revolution', posts: '10K Tweets' },
  ];

  const suggestions = [
    { name: 'Micaharly', username: '@Micaharly22566', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { name: 'Shuhratbek', username: '@shuhratbek', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  ];

  return (
    <div className="hidden md:block w-80 h-screen sticky top-0 p-4 space-y-6 overflow-y-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          className="pl-10 bg-gray-100 dark:bg-gray-800 border-none rounded-full"
          placeholder="Recherche"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">À l'affiche</h2>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg">
              <p className="text-gray-500 text-xs">{trend.topic}</p>
              <p className="font-bold">{trend.tag}</p>
              <p className="text-gray-500 text-xs">{trend.posts}</p>
            </div>
          ))}
          <button className="text-primary text-sm hover:underline">Show more</button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">Suggestion</h2>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="w-10 h-10 object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">{suggestion.name}</p>
                  <p className="text-gray-500 text-sm">{suggestion.username}</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-full text-xs h-8 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                Follow
              </Button>
            </div>
          ))}
          <button className="text-primary text-sm hover:underline">Show more</button>
        </div>
      </div>
    </div>
  );
}