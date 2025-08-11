"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from '@/lib/types';

export default function ProfileTest() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const fetchProfile = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setProfile(null);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setProfile(data);
    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const createTestProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const testProfile = {
        username: `test_${Date.now()}`,
        full_name: 'Utilisateur Test',
        bio: 'Ceci est un profil de test créé automatiquement',
        location: 'Paris, France',
        is_verified: false,
        following_count: 0,
        followers_count: 0,
      };

      const { data, error: insertError } = await supabase
        .from('profiles')
        .insert(testProfile)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      setProfile(data);
      setUsername(data.username);
    } catch (err) {
      console.error('Erreur lors de la création du profil de test:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test de la page profil Supabase</CardTitle>
          <CardDescription>
            Testez la récupération et la création de profils utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez un nom d'utilisateur"
                onKeyPress={(e) => e.key === 'Enter' && fetchProfile()}
              />
            </div>
            <Button 
              onClick={fetchProfile} 
              disabled={loading || !username.trim()}
              className="mt-6"
            >
              {loading ? 'Chargement...' : 'Récupérer'}
            </Button>
          </div>

          <Button 
            onClick={createTestProfile} 
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Créer un profil de test
          </Button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {profile && (
            <Card>
              <CardHeader>
                <CardTitle>Profil trouvé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>ID:</strong> {profile.id}</div>
                  <div><strong>Nom complet:</strong> {profile.full_name}</div>
                  <div><strong>Nom d'utilisateur:</strong> @{profile.username}</div>
                  <div><strong>Bio:</strong> {profile.bio || 'Aucune bio'}</div>
                  <div><strong>Localisation:</strong> {profile.location || 'Non spécifiée'}</div>
                  <div><strong>Vérifié:</strong> {profile.is_verified ? 'Oui' : 'Non'}</div>
                  <div><strong>Abonnements:</strong> {profile.following_count || 0}</div>
                  <div><strong>Abonnés:</strong> {profile.followers_count || 0}</div>
                  <div><strong>Créé le:</strong> {profile.created_at}</div>
                </div>
                <div className="mt-4">
                  <Button 
                    onClick={() => window.open(`/profile/${profile.username}`, '_blank')}
                    className="w-full"
                  >
                    Voir la page profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

