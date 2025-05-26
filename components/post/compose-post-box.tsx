"use client";

import { useState, useRef } from 'react';
import { Image, Smile, MapPin, Calendar, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComposePostBoxProps {
  onSubmit: (content: string, media?: string) => void;
}

export default function ComposePostBox({ onSubmit }: ComposePostBoxProps) {
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = () => {
    if (content.trim() || mediaPreview) {
      onSubmit(content, mediaPreview || undefined);
      setContent('');
      setMediaPreview(null);
      if (mediaInputRef.current) {
        mediaInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
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
          <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
            <textarea
              className="w-full resize-none bg-transparent outline-none text-lg placeholder:text-gray-500 min-h-[50px]"
              placeholder="Quoi de neuf ?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={2}
            />

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
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
              >
                <Image size={20} />
              </button>
              <button className="p-2 text-primary rounded-full hover:bg-primary/10">
                <Smile size={20} />
              </button>
              <button className="p-2 text-primary rounded-full hover:bg-primary/10">
                <Calendar size={20} />
              </button>
              <button className="p-2 text-primary rounded-full hover:bg-primary/10">
                <MapPin size={20} />
              </button>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim() && !mediaPreview}
              className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-4 py-1"
            >
              Publier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}