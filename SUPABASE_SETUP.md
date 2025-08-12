# Configuration Supabase pour la page profil

## 1. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet avec les variables suivantes :

```bash
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

Vous pouvez trouver ces valeurs dans votre projet Supabase :
- Allez dans Settings > API
- Copiez l'URL du projet et la clé publique anon

## 2. Création de la table profiles

Exécutez le script SQL `scripts/create-profiles-table.sql` dans l'éditeur SQL de votre projet Supabase :

1. Allez dans votre projet Supabase
2. Cliquez sur "SQL Editor" dans le menu de gauche
3. Créez un nouveau script
4. Copiez-collez le contenu du fichier `scripts/create-profiles-table.sql`
5. Exécutez le script

## 3. Structure de la table profiles

La table `profiles` contient les champs suivants :

- `id` : Identifiant unique (UUID)
- `username` : Nom d'utilisateur unique
- `full_name` : Nom complet de la personne
- `avatar_url` : URL de l'image de profil
- `cover_photo` : URL de l'image de couverture
- `bio` : Biographie de l'utilisateur
- `location` : Localisation
- `website` : Site web personnel
- `join_date` : Date d'inscription
- `is_verified` : Statut de vérification
- `following_count` : Nombre d'abonnements
- `followers_count` : Nombre d'abonnés
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

## 4. Politiques de sécurité (RLS)

Le script configure automatiquement :
- Lecture publique des profils
- Modification uniquement de son propre profil
- Création de profil lors de l'inscription

## 5. Test de la page profil

Une fois la configuration terminée, vous pouvez tester en visitant :
`/profile/john_doe` (utilisateur d'exemple créé par le script)

## 6. Données d'exemple

Le script crée automatiquement 3 profils d'exemple :
- john_doe
- jane_smith  
- mike_wilson

Vous pouvez les modifier ou les supprimer selon vos besoins.

