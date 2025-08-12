"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DebugAuthPage() {
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier la session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setError(`Erreur de session: ${sessionError.message}`);
        setLoading(false);
        return;
      }

      setSessionInfo({
        hasSession: !!session,
        userId: session?.user?.id,
        email: session?.user?.email,
        userMetadata: session?.user?.user_metadata,
        createdAt: session?.created_at,
        expiresAt: session?.expires_at
      });

      // Si on a une session, récupérer le profil
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          setError(`Erreur de profil: ${profileError.message}`);
        } else {
          setProfileInfo(profile);
        }
      }

      setLoading(false);
    } catch (err) {
      setError(`Erreur inattendue: ${err}`);
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    checkAuthStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Débogage de l&apos;Authentification</h1>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Débogage de l&apos;Authentification</h1>
          <div className="space-x-2">
            <Button onClick={checkAuthStatus} variant="outline">
              Actualiser
            </Button>
            <Button onClick={signOut} variant="destructive">
              Déconnexion
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informations de Session</CardTitle>
            <CardDescription>État de l&apos;authentification Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(sessionInfo, null, 2)}
            </pre>
          </CardContent>
        </Card>

        {profileInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Profil Utilisateur</CardTitle>
              <CardDescription>Données du profil depuis la base</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(profileInfo, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Actions de Test</CardTitle>
            <CardDescription>Testez la navigation vers le profil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={() => window.location.href = '/profile'} 
              className="w-full"
            >
              Aller vers /profile
            </Button>
            <Button 
              onClick={() => window.location.href = '/test-sidebar'} 
              variant="outline"
              className="w-full"
            >
              Aller vers /test-sidebar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variables d&apos;Environnement</CardTitle>
            <CardDescription>Configuration Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Définie' : '❌ Non définie'}</p>
              <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Définie' : '❌ Non définie'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


