import MainLayout from '@/components/layouts/main-layout';

export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        <div className="p-4">
          <p className="text-center text-gray-500 py-8">
            Notifications page content will be implemented in a future update.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}