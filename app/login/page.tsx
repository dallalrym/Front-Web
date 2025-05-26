'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from "@/components/ui/input-field"
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        
        <form className="w-full">
          <InputField
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <InputField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex justify-center mt-4">
            <Button variant="secondary" className="w-32">
              Connexion
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