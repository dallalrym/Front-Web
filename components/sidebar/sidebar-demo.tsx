"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Simulation des données d'utilisateur pour la démonstration
const mockUser = {
  id: '123',
  email: 'john.doe@example.com',
  user_metadata: {
    full_name: 'John Doe',
    username: 'john_doe'
  }
};

export default function SidebarDemo() {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('unauthenticated');

  const simulateLoading = () => {
    setAuthState('loading');
    setTimeout(() => setAuthState('authenticated'), 2000);
  };

  const simulateLogout = () => {
    setAuthState('unauthenticated');
  };

  const renderUserSection = () => {
    switch (authState) {
      case 'loading':
        return (
          <div className="mt-auto mb-4 p-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="hidden xl:block space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
            </div>
          </div>
        );

      case 'authenticated':
        return (
          <div className="mt-auto mb-4">
            {/* Profil utilisateur */}
            <div className="flex items-center p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700">
                  {mockUser.user_metadata.full_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden xl:block">
                <p className="font-bold text-sm">
                  {mockUser.user_metadata.full_name}
                </p>
                <p className="text-gray-500 text-sm">
                  {mockUser.email}
                </p>
              </div>
            </div>

            {/* Bouton de déconnexion */}
            <Button
              onClick={simulateLogout}
              variant="outline"
              className="w-full rounded-full py-2 text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <span className="hidden xl:block">Déconnexion</span>
            </Button>
          </div>
        );

      case 'unauthenticated':
        return (
          <div className="mt-auto mb-4 p-3">
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-2">Non connecté</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={simulateLoading}
              >
                Se connecter
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-20 xl:w-64 h-screen sticky top-0 flex flex-col p-4 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="p-2 mb-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-blue-100">
          <span className="text-2xl font-bold text-blue-600">Logo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {['Home', 'Explore', 'Bookmarks', 'Profile'].map((item) => (
          <div
            key={item}
            className="flex items-center px-3 py-3 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            <div className="w-6 h-6 mr-4 bg-gray-300 rounded"></div>
            <span className="hidden xl:block">{item}</span>
          </div>
        ))}
      </nav>

      {/* Bouton Publication */}
      <Button className="bg-blue-600 rounded-full py-3 text-white font-bold w-full mt-auto">
        <span className="hidden xl:block">Publication</span>
        <span className="xl:hidden">+</span>
      </Button>

      {/* Section utilisateur */}
      {renderUserSection()}

      {/* Contrôles de démonstration */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <p className="text-xs text-gray-500 mb-2">Démo - États :</p>
        <div className="space-y-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAuthState('loading')}
            className="w-full text-xs"
          >
            Chargement
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAuthState('authenticated')}
            className="w-full text-xs"
          >
            Connecté
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAuthState('unauthenticated')}
            className="w-full text-xs"
          >
            Non connecté
          </Button>
        </div>
      </div>
    </div>
  );
}


