'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/firebase/auth'
import { createDocument, COLLECTIONS } from '@/lib/firebase/firestore'
import { motion } from 'framer-motion'
import { AnimatedContainer } from '@/components/AnimatedContainer'
import { AnimatedButton } from '@/components/AnimatedButton'
import { space, radius, colors, shadows } from '@/lib/cssVars'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { user, error: signUpError } = await signUp(email, password, fullName)

    if (signUpError) {
      setError(signUpError)
      setLoading(false)
      return
    }

    if (user) {
      // Create user profile in Firestore
      const { error: profileError } = await createDocument(COLLECTIONS.USERS, {
        email: user.email || '',
        fullName: fullName || 'User',
        avatarUrl: null
      }, user.uid)

      if (profileError) {
        console.error('Failed to create profile:', profileError)
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
      {/* Animated background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

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
            Create Account ✨
          </h1>
          <p style={{ color: colors.textMuted, fontSize: 15, marginBottom: space[8], textAlign: 'center' }}>
            Sign up to get started with task management
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
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
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
            transition={{ duration: 0.4, delay: 0.6 }}
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
            <p style={{ fontSize: 13, color: colors.textMuted, marginTop: space[1] }}>
              Must be at least 6 characters
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <AnimatedButton
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              style={{
                width: '100%',
                marginBottom: space[4],
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </AnimatedButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            style={{ textAlign: 'center', fontSize: 14, color: colors.textMuted }}
          >
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: colors.accentGreen, textDecoration: 'none', fontWeight: 600 }}>
              Sign in
            </Link>
          </motion.p>
        </form>
      </AnimatedContainer>
    </div>
  )
}
