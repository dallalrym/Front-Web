import MainLayout from '@/components/layouts/main-layout';
import UserProfile from '@/components/profile/user-profile';
import { getMockUserByUsername, mockUsers } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface ProfilePageProps {
  params: { username: string };
}

export function generateStaticParams() {
  return mockUsers.map((user) => ({
    username: user.username,
  }));
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const user = getMockUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <MainLayout>
      <UserProfile user={user} />
    </MainLayout>
  );
}