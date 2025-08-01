'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import PostItemRessource from '../post/PostItemRessource'


type Resource = {
  id: number
  title: string
  description: string
  content: string
  created_at?: string
}

export default function Feed() {
  const [resources, setResources] = useState<Resource[]>([])

useEffect(() => {
  async function fetchResources() {
    const { data, error } = await supabase.from('resource').select('*')

    console.log('DATA 🔽', data)
    console.log('ERROR 🔽', error)

    if (error) {
      console.error('Erreur Supabase :', error)
    } else {
      setResources(data || [])
    }
  }

  fetchResources()
}, [])

  return (
    <div className="flex flex-col">
      {resources.length === 0 ? (
        <p className="text-center text-muted-foreground mt-4">Aucune ressource trouvée.</p>
      ) : (
        resources.map((res) => (
          <PostItemRessource
            key={res.id}
            title={res.title}
            description={res.description}
            content={res.content}
            created_at={res.created_at}
          />
        ))
      )}
    </div>
  )
}
