import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from '@/lib/types';

export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);

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
    }

    if (username) {
      fetchProfile();
    }
  }, [username, supabase]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return data;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
      throw err;
    }
  };

  const followUser = async (targetUserId: string) => {
    // TODO: Implémenter la logique de suivi
    // Cela nécessiterait une table séparée pour les relations de suivi
    console.log('Fonctionnalité de suivi à implémenter');
  };

  const unfollowUser = async (targetUserId: string) => {
    // TODO: Implémenter la logique de désabonnement
    console.log('Fonctionnalité de désabonnement à implémenter');
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    followUser,
    unfollowUser,
  };
}

