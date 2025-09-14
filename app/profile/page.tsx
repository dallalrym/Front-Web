"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/main-layout';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2, Settings } from 'lucide-react';
import DeleteAccountDialog from '@/components/profile/delete-account-dialog';

type Profile = {
  id: number;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at?: string;
  updated_at?: string;
};

type Resource = {
  id: string | number;
  title?: string | null;
  created_at?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        router.push('/login');
        return;
      }

      const authUser = sessionData.session.user;

      // Charger le profil par user_id
      const { data: existing, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Erreur profil:', fetchError);
      }

      let currentProfile = existing as Profile | null;

      // Créer le profil s'il n'existe pas
      if (!currentProfile) {
        const fullName = (authUser.user_metadata as any)?.full_name || authUser.email?.split('@')[0] || 'Utilisateur';
        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: authUser.id,
            full_name: fullName,
            email: authUser.email,
            avatar_url: null,
          })
          .select('*')
          .single();

        if (insertError) {
          console.error('Erreur création profil:', insertError);
        } else {
          currentProfile = inserted as Profile;
        }
      }

      setProfile(currentProfile);

      // Charger les ressources (tentative sur table "posts" par user_id)
      try {
        const { data: posts } = await supabase
          .from('posts')
          .select('id, created_at, title')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });
        if (posts) setResources(posts as unknown as Resource[]);
      } catch (e) {
        // Ignore si la table n'existe pas
      }

      setLoading(false);
    };

    run();
  }, [router]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Chargement du profil...</h1>
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="flex-1 p-8">
          <div className="max-w-3xl mx-auto text-center text-gray-500">
            Impossible de charger le profil.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Profil */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4 flex items-center justify-center">
                {profile.avatar_url ? (
                  <Image src={profile.avatar_url} alt={profile.full_name || 'Avatar'} width={64} height={64} className="object-cover" />
                ) : (
                  <span className="text-xl font-bold text-gray-600">
                    {(profile.full_name || profile.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.full_name || 'Utilisateur'}</h1>
                <p className="text-gray-600">{profile.email}</p>
              </div>
            </div>
            
            {/* Boutons d'action */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              
              <DeleteAccountDialog>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer le compte
                </Button>
              </DeleteAccountDialog>
            </div>
          </div>

          {/* Ressources publiées */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Ressources publiées</h2>
            {resources.length === 0 ? (
              <p className="text-gray-500">Aucune ressource publiée pour le moment.</p>
            ) : (
              <ul className="space-y-2">
                {resources.map((r) => (
                  <li key={String(r.id)} className="p-3 rounded border border-gray-200">
                    <div className="font-medium">{r.title || `Ressource #${r.id}`}</div>
                    {r.created_at && (
                      <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
