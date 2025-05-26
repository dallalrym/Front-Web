"use client";

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import {
  Home, Search, Bell, Bookmark, ListOrdered,
  User, PenSquare, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ComposePostDialog from '@/components/post/compose-post-dialog';
import { useState } from 'react';

export default function LeftSidebar() {
  const pathname = usePathname();
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Lists', href: '/lists', icon: ListOrdered },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Logout', href: '/login', icon: LogOut },
  ];

  return (
    <div className="w-20 xl:w-64 h-screen sticky top-0 flex flex-col p-4">
      <div className="p-2 mb-4">
        <Link href="/">
      <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
        <Image
          src="/Image/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="object-cover"
        />
      </div>
    </Link>
      </div>

      <nav className="space-y-2 mb-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-3 rounded-full transition-colors",
                "hover:bg-gray-200 dark:hover:bg-gray-800",
                isActive && "font-bold"
              )}
            >
              <Icon className="w-6 h-6 mr-4" />
              <span className="hidden xl:block">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <Button
        onClick={() => setShowComposeDialog(true)}
        className="bg-primary rounded-full py-3 text-white font-bold w-full mt-auto"
      >
        <span className="hidden xl:block">Publication</span>
        <PenSquare className="w-6 h-6 xl:hidden" />
      </Button>

      <ComposePostDialog
        open={showComposeDialog}
        onOpenChange={setShowComposeDialog}
      />

      <div className="mt-auto mb-4 flex items-center p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="hidden xl:block">
          <p className="font-bold text-sm">Babur</p>
          <p className="text-gray-500 text-sm">@babur</p>
        </div>
      </div>
    </div>
  );
}