import { useState, useEffect } from 'react'
import { supabase, type AuthUser } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        // Récupérer la session actuelle avec le profil
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Erreur lors de la récupération de la session:', error)
          if (isMounted) {
            setUser(null)
            setLoading(false)
          }
          return
        }

        if (session?.user && isMounted) {
          try {
            const userWithProfile = await getUserWithProfile(session.user)
            setUser(userWithProfile)
          } catch (profileError) {
            console.error('Erreur lors de la récupération du profil:', profileError)
            // En cas d'erreur de profil, on utilise l'utilisateur de base
            setUser({
              id: session.user.id,
              email: session.user.email!,
              username: session.user.user_metadata?.username,
              user_metadata: {
                full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Utilisateur',
                username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user'
              }
            })
          }
        } else if (isMounted) {
          setUser(null)
        }
      } catch (error) {
        console.error('Erreur inattendue dans initializeAuth:', error)
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      try {
        if (session?.user) {
          try {
            const userWithProfile = await getUserWithProfile(session.user)
            setUser(userWithProfile)
          } catch (profileError) {
            console.error('Erreur lors de la récupération du profil:', profileError)
            // En cas d'erreur de profil, on utilise l'utilisateur de base
            setUser({
              id: session.user.id,
              email: session.user.email!,
              username: session.user.user_metadata?.username,
              user_metadata: {
                full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Utilisateur',
                username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'user'
              }
            })
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Erreur lors du changement d\'état d\'authentification:', error)
        setUser(null)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const getUserWithProfile = async (user: User): Promise<AuthUser> => {
    try {
      // Récupérer le profil depuis la base de données
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn('Erreur lors de la récupération du profil:', error)
        // Si pas de profil, on utilise les métadonnées de l'utilisateur
        return {
          id: user.id,
          email: user.email!,
          username: user.user_metadata?.username,
          user_metadata: {
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'user'
          }
        }
      }

      return {
        id: user.id,
        email: user.email!,
        username: profile?.username,
        user_metadata: {
          full_name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
          username: profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'user'
        }
      }
    } catch (error) {
      console.error('Erreur inattendue dans getUserWithProfile:', error)
      // En cas d'erreur, on retourne un utilisateur avec les métadonnées de base
      return {
        id: user.id,
        email: user.email!,
        username: user.user_metadata?.username || user.email?.split('@')[0] || 'user',
        user_metadata: {
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
          username: user.user_metadata?.username || user.email?.split('@')[0] || 'user'
        }
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