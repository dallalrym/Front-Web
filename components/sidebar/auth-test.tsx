"use client";

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthTest() {
  const { user, loading, signOut } = useAuth();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">Test Auth Sidebar</CardTitle>
        <CardDescription>État de l&apos;authentification dans la sidebar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs space-y-1">
          <p><strong>Loading:</strong> {loading ? '🔄 Oui' : '✅ Non'}</p>
          <p><strong>User:</strong> {user ? '✅ Connecté' : '❌ Non connecté'}</p>
          {user && (
            <>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Nom:</strong> {user.user_metadata?.full_name || 'Non défini'}</p>
            </>
          )}
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            onClick={() => window.location.href = '/profile'} 
            size="sm" 
            className="w-full text-xs"
          >
            Test /profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


