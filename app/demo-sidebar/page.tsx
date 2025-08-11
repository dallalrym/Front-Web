import SidebarDemo from '@/components/sidebar/sidebar-demo';

export default function DemoSidebarPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarDemo />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Démonstration de la Sidebar
          </h1>
          
          <div className="grid gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fonctionnalités de la Sidebar
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Affichage du profil utilisateur :</strong> Nom complet et email de l'utilisateur connecté</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>États de chargement :</strong> Animation de chargement pendant la récupération des données</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Gestion de la déconnexion :</strong> Bouton de déconnexion fonctionnel</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>États non connectés :</strong> Affichage approprié quand l'utilisateur n'est pas connecté</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Instructions de test
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">1. Test des états d'authentification</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Utilisez les boutons de démonstration dans la sidebar pour tester les différents états :
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <li>• <strong>Chargement :</strong> Simule le chargement des données utilisateur</li>
                    <li>• <strong>Connecté :</strong> Affiche un utilisateur connecté avec nom et email</li>
                    <li>• <strong>Non connecté :</strong> Affiche l'état de déconnexion</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">2. Test de la responsivité</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Redimensionnez votre navigateur pour tester l'affichage sur différentes tailles d'écran.
                    La sidebar s'adapte automatiquement (mode compact sur mobile, mode étendu sur desktop).
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">3. Test des interactions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Testez les interactions comme le survol des éléments, les clics sur les boutons,
                    et la navigation entre les différents états.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Prochaines étapes
              </h2>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Cette démonstration montre comment la sidebar fonctionnera une fois intégrée avec Supabase.
                Pour l'utiliser en production :
              </p>
              <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
                <li>Configurez vos variables d'environnement Supabase</li>
                <li>Créez la table <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">profiles</code> avec le script SQL fourni</li>
                <li>Remplacez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">SidebarDemo</code> par <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">LeftSidebar</code> dans votre layout</li>
                <li>Testez l'authentification réelle avec vos utilisateurs</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


