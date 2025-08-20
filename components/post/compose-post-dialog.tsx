"use client";

import { useState, useRef, useEffect } from 'react';
import { Image, Smile, MapPin, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ComposePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComposePostDialog({ open, onOpenChange }: ComposePostDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session?.user);
    };
    checkAuth();
  }, [open]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez renseigner au minimum le titre et le contenu.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        toast({ title: "Non connecté", description: "Veuillez vous connecter pour publier." });
        setIsSubmitting(false);
        return;
      }

      const authUser = sessionData.session.user;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_id')
        .eq('user_id', authUser.id)
        .maybeSingle();

      if (profileError) {
        toast({ title: "Erreur profil", description: "Impossible de récupérer le profil." });
        setIsSubmitting(false);
        return;
      }

      if (!profile) {
        toast({ title: "Profil manquant", description: "Veuillez compléter votre profil avant de publier." });
        setIsSubmitting(false);
        return;
      }

      const payloadBase = {
        title: title.trim(),
        description: description.trim() || null,
        content: content.trim(),
        category_id: null as number | null,
        type_id: null as number | null,
        relation_type_id: null as number | null,
        created_by: profile.id as number,
        visibility,
        validated: 0 as number,
      };

      // Essai d'insertion avec le statut choisi
      let insertErrorMessage: string | null = null;
      const { error: insertErrorWithStatus } = await supabase
        .from('resource')
        .insert({ ...payloadBase, status });

      if (insertErrorWithStatus) {
        insertErrorMessage = insertErrorWithStatus.message;
      }

      // Si la contrainte CHECK sur status échoue, on réessaie sans le champ status pour laisser la valeur par défaut DB
      if (insertErrorMessage && insertErrorMessage.includes('resource_status_check')) {
        const { error: insertErrorWithoutStatus } = await supabase
          .from('resource')
          .insert(payloadBase);
        if (insertErrorWithoutStatus) {
          toast({ title: "Erreur à la publication", description: insertErrorWithoutStatus.message });
          setIsSubmitting(false);
          return;
        }
      } else if (insertErrorMessage) {
        toast({ title: "Erreur à la publication", description: insertErrorMessage });
        setIsSubmitting(false);
        return;
      }

      toast({ title: "Ressource publiée", description: "Votre ressource a été ajoutée avec succès." });
      setTitle('');
      setDescription('');
      setContent('');
      setVisibility('public');
      setStatus('published');
      setMediaPreview(null);
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Erreur inattendue", description: e?.message || 'Une erreur est survenue.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-800 pb-2">
          <DialogTitle className="text-xl font-bold">Publier une ressource</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex">
            <div className="mr-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                  alt="Your avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-3">
                <Input
                  placeholder="Titre de la ressource"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  className="min-h-[80px]"
                  placeholder="Description (optionnelle)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Textarea
                  className="w-full resize-none bg-transparent outline-none text-lg placeholder:text-gray-500 min-h-[150px]"
                  placeholder="Contenu de la ressource"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  autoFocus
                />
                <div className="flex items-center gap-3">
                  <select
                    className="border border-gray-200 dark:border-gray-800 rounded px-3 py-2 bg-transparent"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                  >
                    <option value="public">Public</option>
                    <option value="private">Privé</option>
                  </select>
                  <select
                    className="border border-gray-200 dark:border-gray-800 rounded px-3 py-2 bg-transparent"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  >
                    <option value="published">Publié</option>
                    <option value="draft">Brouillon</option>
                  </select>
                </div>
              </div>

              {mediaPreview && (
                <div className="relative mt-2 rounded-2xl overflow-hidden">
                  <img 
                    src={mediaPreview} 
                    alt="Media preview" 
                    className="max-h-80 w-auto"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1"
                    onClick={() => setMediaPreview(null)}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex space-x-1">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleMediaChange}
              ref={mediaInputRef}
            />
            <button 
              className="p-2 text-primary rounded-full hover:bg-primary/10"
              onClick={() => mediaInputRef.current?.click()}
              disabled={!isAuthenticated}
            >
              <Image size={20} />
            </button>
            <button className="p-2 text-primary rounded-full hover:bg-primary/10" disabled={!isAuthenticated}>
              <Smile size={20} />
            </button>
            <button className="p-2 text-primary rounded-full hover:bg-primary/10" disabled={!isAuthenticated}>
              <Calendar size={20} />
            </button>
            <button className="p-2 text-primary rounded-full hover:bg-primary/10" disabled={!isAuthenticated}>
              <MapPin size={20} />
            </button>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim() || !isAuthenticated}
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-4 py-1"
          >
            {isSubmitting ? 'Publication…' : 'Publier'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}