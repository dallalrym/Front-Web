-- Script pour créer la table profiles dans Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- Création de la table profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  cover_photo TEXT,
  bio TEXT,
  location VARCHAR(100),
  website TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  is_verified BOOLEAN DEFAULT FALSE,
  following_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création d'un index sur le username pour des recherches rapides
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Création d'un trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertion de quelques profils d'exemple (optionnel)
INSERT INTO profiles (username, full_name, bio, location, is_verified) VALUES
  ('john_doe', 'John Doe', 'Développeur passionné par les nouvelles technologies', 'Paris, France', true),
  ('jane_smith', 'Jane Smith', 'Designer UX/UI créative', 'Lyon, France', false),
  ('mike_wilson', 'Mike Wilson', 'Entrepreneur et mentor', 'Marseille, France', true)
ON CONFLICT (username) DO NOTHING;

-- Politique RLS (Row Level Security) pour permettre la lecture publique des profils
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Politique pour permettre aux utilisateurs de modifier leur propre profil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Politique pour permettre aux utilisateurs de créer leur profil
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

