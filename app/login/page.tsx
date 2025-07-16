'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from "@/components/ui/input-field";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // Supabase ne gère pas directement "username" pour l'auth, mais email.
    // Donc tu dois stocker dans ta base Supabase les utilisateurs avec un email.
    // Si tu utilises "username", il faut gérer une table custom.

    // Ici on part sur email (username sera un email) :
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // attention ici c’est l’email !
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Connexion OK, rediriger ou afficher un message
      alert('Connexion réussie !');
      // Par exemple : router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF4F1] flex flex-col items-center p-8">
      <div className="w-full max-w-md flex flex-col items-center ">
        <Image
          src="/Image/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="object-cover"
        />
        
        <h2 className="text-xl text-[#B47BA6] font-medium mb-6 text-center">
          Rejoignez votre communauté.
        </h2>
        
        <form className="w-full" onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <InputField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {errorMsg && (
            <p className="text-red-600 text-center mt-2">{errorMsg}</p>
          )}

          <div className="flex justify-center mt-4">
            <Button variant="secondary" className="w-32" type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Connexion'}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <Link href="#" className="text-[#B47BA6] text-sm hover:underline">
              Mot de passe oublié
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/register"
              className="text-[#B47BA6] hover:underline"
            >
              Créez un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
