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
        <h2 className="font-bold text-xl mb-4">À l&apos;affiche</h2>
        <div className="space-y-4">
          {/* {trends.map((trend, index) => (
          ))} */}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <h2 className="font-bold text-xl mb-4">Suggestion</h2>
        <div className="space-y-4">
          {/* {suggestions.map((suggestion, index) => (      
          ))} */} 
        </div>
      </div>
    </div>
  );
}