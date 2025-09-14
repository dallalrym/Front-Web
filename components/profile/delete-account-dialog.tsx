"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface DeleteAccountDialogProps {
  children: React.ReactNode;
}

export default function DeleteAccountDialog({ children }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteAccount } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const expectedText = "SUPPRIMER MON COMPTE";
  const isConfirmationValid = confirmationText === expectedText;

  const handleDeleteAccount = async () => {
    if (!isConfirmationValid) {
      toast({
        title: "Erreur",
        description: "Veuillez taper exactement 'SUPPRIMER MON COMPTE' pour confirmer.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);
    
    try {
      const { error } = await deleteAccount();
      
      if (error) {
        toast({
          title: "Erreur",
          description: error.message || "Une erreur est survenue lors de la suppression du compte.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Compte supprimé",
          description: "Votre compte a été supprimé avec succès.",
        });
        
        // Rediriger vers la page d'accueil
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer le compte
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Cette action est <strong>irréversible</strong>. Toutes vos données seront définitivement supprimées :
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Votre profil et vos informations personnelles</li>
              <li>Tous vos posts et publications</li>
              <li>Vos interactions (likes, commentaires, etc.)</li>
              <li>Vos paramètres et préférences</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-3">
              <p className="text-sm text-yellow-800">
                <strong>Note :</strong> Votre compte d'authentification restera actif. 
                Pour une suppression complète, contactez le support technique.
              </p>
            </div>
            <div className="mt-4">
              <Label htmlFor="confirmation" className="text-sm font-medium">
                Pour confirmer, tapez exactement : <code className="bg-gray-100 px-1 rounded">SUPPRIMER MON COMPTE</code>
              </Label>
              <Input
                id="confirmation"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                placeholder="SUPPRIMER MON COMPTE"
                className="mt-2"
                disabled={isDeleting}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={!isConfirmationValid || isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Suppression...
              </>
            ) : (
              'Supprimer définitivement'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
