import LeftSidebar from '@/components/sidebar/left-sidebar';
import RightSidebar from '@/components/sidebar/right-sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      <LeftSidebar />
      <main className="flex-1 border-x border-gray-200 dark:border-gray-800">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}