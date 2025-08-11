import MainLayout from '@/components/layouts/main-layout';
import UserProfile from '@/components/profile/user-profile';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import { notFound } from 'next/navigation';

interface ProfilePageProps {
  params: { username: string };
}

// Fonction pour récupérer les informations utilisateur depuis Supabase
async function getUserByUsername(username: string): Promise<Profile | null> {
  try {
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return null;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <MainLayout>
      <ErrorBoundary>
        <UserProfile user={user} />
      </ErrorBoundary>
    </MainLayout>
  );
}