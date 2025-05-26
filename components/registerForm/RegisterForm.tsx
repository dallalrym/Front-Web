'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../ui/input-field';
import { Button } from '../ui/button';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }
      
      // Redirect to login page on success
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: 'Une erreur inattendue est survenue' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#B47BA6] mb-4">
          Création de votre compte
        </h1>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errors.general}
        </div>
      )}

      <InputField
        label="Nom d'utilisateur"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />

      <InputField
        label="Mot de passe"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <InputField
        label="Confirmation de mot de passe"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#F2B8B5] text-[#B47BA6] hover:bg-[#eea6a3] transition-all duration-300 transform hover:scale-105"
        >
          {isSubmitting ? 'Création en cours...' : 'Créez votre compte'}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;