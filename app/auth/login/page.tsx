'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, signInWithGoogle } from '@/lib/firebase/auth'
import { createDocument, getDocument, COLLECTIONS } from '@/lib/firebase/firestore'
import { motion } from 'framer-motion'
import { AnimatedContainer } from '@/components/AnimatedContainer'
import { AnimatedButton } from '@/components/AnimatedButton'
import { space, radius, colors, shadows } from '@/lib/cssVars'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { user, error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError)
      setLoading(false)
      return
    }

    if (user) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')

    const { user, error: signInError } = await signInWithGoogle()

    if (signInError) {
      setError(signInError)
      setGoogleLoading(false)
      return
    }

    if (user) {
      // Check if user profile exists, create if not
      const { data: existingProfile } = await getDocument(COLLECTIONS.USERS, user.uid)
      
      if (!existingProfile) {
        await createDocument(COLLECTIONS.USERS, {
          email: user.email || '',
          fullName: user.displayName || 'User',
          avatarUrl: user.photoURL || null
        }, user.uid)
      }

      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.bgPrimary,
      padding: space[5],
      position: 'relative',
      overflow: 'hidden',
    }}>

      <AnimatedContainer animation="scaleIn" delay={0.2} style={{
        width: '100%',
        maxWidth: 440,
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.xl,
        padding: space[8],
        position: 'relative',
        zIndex: 1,
        boxShadow: shadows.xl,
      }}>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: space[2], textAlign: 'center', letterSpacing: '-0.02em' }}>
            Welcome Back 👋
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 15, marginBottom: space[8], textAlign: 'center' }}>
            Sign in to your account to continue
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: `${space[3]} ${space[4]}`,
              borderRadius: radius.md,
              marginBottom: space[5],
              background: colors.accentRedLight,
              border: '1px solid rgba(239,68,68,0.3)',
              color: colors.accentRed,
              fontSize: 14,
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{ marginBottom: space[4] }}
          >
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: colors.textSecondary,
              marginBottom: space[2],
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: `${space[3]} ${space[4]}`,
                borderRadius: radius.md,
                background: colors.bgSecondary,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textPrimary,
                fontSize: 15,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            style={{ marginBottom: space[6] }}
          >
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: colors.textSecondary,
              marginBottom: space[2],
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: `${space[3]} ${space[4]}`,
                borderRadius: radius.md,
                background: colors.bgSecondary,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textPrimary,
                fontSize: 15,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <AnimatedButton
              type="submit"
              disabled={loading || googleLoading}
              variant="primary"
              size="lg"
              style={{
                width: '100%',
                marginBottom: space[4],
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </AnimatedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: space[3], 
              marginBottom: space[4],
            }}
          >
            <div style={{ flex: 1, height: 1, background: colors.borderSubtle }} />
            <span style={{ fontSize: 13, color: colors.textMuted }}>OR</span>
            <div style={{ flex: 1, height: 1, background: colors.borderSubtle }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              style={{
                width: '100%',
                padding: `${space[3]} ${space[4]}`,
                borderRadius: radius.md,
                background: colors.bgSecondary,
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textPrimary,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading || googleLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: space[2],
                marginBottom: space[4],
                opacity: loading || googleLoading ? 0.5 : 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            style={{ textAlign: 'center', fontSize: 14, color: colors.textMuted }}
          >
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ color: colors.accentGreen, textDecoration: 'none', fontWeight: 600 }}>
              Sign up
            </Link>
          </motion.p>
        </form>
      </AnimatedContainer>
    </div>
  )
}
