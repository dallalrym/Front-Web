"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestAuthPage() {
  const { user, loading, signOut } = useAuth();
  const [directSession, setDirectSession] = useState<any>(null);
  const [directProfile, setDirectProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkDirectAuth();
  }, []);

  const checkDirectAuth = async () => {
    try {
      // Vérifier directement avec Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setError(`Erreur de session: ${sessionError.message}`);
        return;
      }

      setDirectSession(session);

      if (session?.user) {
        // Récupérer le profil directement
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          setError(`Erreur de profil: ${profileError.message}`);
        } else {
          setDirectProfile(profile);
        }
      }
    } catch (err) {
      setError(`Erreur: ${err}`);
    }
  };

  const signInTest = async () => {
    // Test de connexion avec un compte de test
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123'
    });

    if (error) {
      setError(`Erreur de connexion: ${error.message}`);
    } else {
      setError('Connexion réussie !');
      checkDirectAuth();
    }
  };

  const clearError = () => setError(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Test de l&apos;Authentification</h1>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{error}</p>
              <Button onClick={clearError} variant="outline" size="sm" className="mt-2">
                Fermer
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hook useAuth */}
          <Card>
            <CardHeader>
              <CardTitle>Hook useAuth</CardTitle>
              <CardDescription>État de l&apos;authentification via le hook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Loading:</strong> {loading ? '🔄 Oui' : '✅ Non'}</p>
                <p><strong>Utilisateur connecté:</strong> {user ? '✅ Oui' : '❌ Non'}</p>
                {user && (
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Nom:</strong> {user.user_metadata?.full_name || 'Non défini'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session directe Supabase */}
          <Card>
            <CardHeader>
              <CardTitle>Session Directe Supabase</CardTitle>
              <CardDescription>État de la session via Supabase directement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Session existante:</strong> {directSession ? '✅ Oui' : '❌ Non'}</p>
                {directSession?.user && (
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p><strong>ID:</strong> {directSession.user.id}</p>
                    <p><strong>Email:</strong> {directSession.user.email}</p>
                    <p><strong>Métadonnées:</strong> {JSON.stringify(directSession.user.user_metadata)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profil utilisateur */}
        {directProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Profil Utilisateur</CardTitle>
              <CardDescription>Données du profil depuis la base</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(directProfile, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Actions de test */}
        <Card>
          <CardHeader>
            <CardTitle>Actions de Test</CardTitle>
            <CardDescription>Testez différentes fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button onClick={checkDirectAuth} variant="outline">
                Actualiser l&apos;état
              </Button>
              <Button onClick={signInTest} variant="outline">
                Test de connexion
              </Button>
              <Button onClick={signOut} variant="destructive">
                Déconnexion
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Navigation de test :</h4>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => window.location.href = '/profile'} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Aller vers /profile
                </Button>
                <Button 
                  onClick={() => window.location.href = '/debug-auth'} 
                  variant="outline"
                >
                  Aller vers /debug-auth
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variables d'environnement */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Variables d&apos;environnement et configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Définie' : '❌ Non définie'}</p>
              <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Définie' : '❌ Non définie'}</p>
              <p><strong>Mode:</strong> {process.env.NODE_ENV}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


