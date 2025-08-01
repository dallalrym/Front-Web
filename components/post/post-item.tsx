'use client'

import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Bookmark, Share } from 'lucide-react'

type Props = {
  title: string
  description: string
  content: string
  created_at?: string
}

export default function PostItemRessource({ title, description, content, created_at }: Props) {
  const timeAgo = created_at
    ? formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: fr })
    : null

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition border-b border-gray-200 dark:border-gray-800">
      <div className="flex">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">
          {title[0]?.toUpperCase()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{title}</p>
              {timeAgo && <p className="text-sm text-gray-500">{timeAgo}</p>}
            </div>
          </div>

          <div className="mt-2 text-gray-700 dark:text-gray-200">
            <p className="text-sm">{description}</p>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {content}
            </div>
          </div>

          <div className="mt-3 flex gap-4 text-gray-500 dark:text-gray-400">
            <button className="flex items-center hover:text-primary transition">
              <Bookmark className="w-4 h-4 mr-1" />
              <span>Enregistrer</span>
            </button>
            <button className="flex items-center hover:text-primary transition">
              <Share className="w-4 h-4 mr-1" />
              <span>Parrtager</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
