"use client";

import Link from 'next/link';
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, Search, Bell, Bookmark, ListOrdered,
  User, PenSquare, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ComposePostDialog from '@/components/post/compose-post-dialog';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (!error) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Search },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Profile', href: '/profile', icon: User },
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

      {/* Utilisateur non connecté */}
      {!loading && !user && (
          <div className="p-3 text-center mb-8">
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full">CONNEXION</Button>
            </Link>
          </div>
        )}

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
        className="bg-primary rounded-full py-3 text-white font-bold w-full"
      >
        <span className="hidden xl:block">Publication</span>
        <PenSquare className="w-6 h-6 xl:hidden" />
      </Button>

      <ComposePostDialog
        open={showComposeDialog}
        onOpenChange={setShowComposeDialog}
      />

      {/* Section utilisateur en bas */}
      <div className="mt-auto mb-4">
        {/* État de chargement */}
        {loading && (
          <div className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="hidden xl:block space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
            </div>
          </div>
        )}

        {/* Utilisateur connecté */}
        {!loading && user && (
          <div>
            <div className="flex items-center p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                {user.user_metadata?.full_name ? (
                  <span className="text-sm font-bold text-gray-700">
                    {user.user_metadata.full_name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <span className="text-sm font-bold text-gray-700">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="hidden xl:block">
                <p className="font-bold text-sm">
                  {user.user_metadata?.full_name || 'Utilisateur'}
                </p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full rounded-full py-2 text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 mr-2 xl:mr-2" />
              <span className="hidden xl:block">Déconnexion</span>
            </Button>
          </div>
        )}

        {/* Utilisateur non connecté */}
      </div>
    </div>
  );
}