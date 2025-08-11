import MainLayout from '@/components/layouts/main-layout';

export default function TestSidebarPage() {
  return (
    <MainLayout>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Test de la Sidebar</h1>
        <p className="text-gray-600">
          Cette page permet de tester la sidebar gauche avec l'affichage des informations de l'utilisateur connecté.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-2">Instructions de test :</h2>
          <ul className="text-blue-800 space-y-1">
            <li>• Vérifiez que la sidebar gauche affiche les informations de l'utilisateur connecté</li>
            <li>• Le nom complet et l'email doivent être visibles en bas de la sidebar</li>
            <li>• Le bouton de déconnexion doit être fonctionnel</li>
            <li>• Testez les différents états (chargement, connecté, non connecté)</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}


