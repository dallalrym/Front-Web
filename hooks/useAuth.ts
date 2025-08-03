import { useState, useEffect } from 'react'
import { supabase, type AuthUser } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session actuelle avec le profil
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userWithProfile = await getUserWithProfile(session.user)
        setUser(userWithProfile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Repere les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const userWithProfile = await getUserWithProfile(session.user)
        setUser(userWithProfile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const getUserWithProfile = async (user: User): Promise<AuthUser> => {
    // Récupérer le profil depuis la base de données
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', user.id)
      .single()

    return {
      id: user.id,
      email: user.email!,
      username: profile?.username,
      user_metadata: {
        full_name: profile?.full_name || user.user_metadata.full_name,
        username: profile?.username || user.user_metadata.username
      }
    }
  }

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .limit(1)
    
    return !error && (data === null || data.length === 0)
  }

  const signUp = async (email: string, password: string, fullName: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username,
        },
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    checkUsernameAvailability,
    signUp,
    signIn,
    signOut,
  }
}