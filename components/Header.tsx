'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/firebase/auth'
import { motion, AnimatePresence } from 'framer-motion'
import { space, radius, colors, shadows } from '@/lib/cssVars'

interface HeaderProps {
  user: { displayName?: string | null; email: string | null }
}

function getDisplayName(displayName: string | null | undefined, email: string | null) {
  return displayName || email?.split('@')[0] || 'User'
}

export default function Header({ user }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
    router.push('/auth/login')
    router.refresh()
  }

  const displayName = getDisplayName(user.displayName, user.email)
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header style={{
      height: 64, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      padding: `0 ${space[6]}`, borderBottom: `1px solid ${colors.borderSubtle}`,
      background: colors.bgSecondary,
    }}>
      <div style={{ position: 'relative' }}>
        <motion.button
          onClick={() => setShowMenu(!showMenu)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'flex', alignItems: 'center', gap: space[3],
            background: 'none', border: 'none', cursor: 'pointer', padding: `${space[2]} ${space[3]}`,
            borderRadius: radius.md,
          }}
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            style={{
              width: 36, height: 36, borderRadius: radius.md,
              background: `linear-gradient(135deg, ${colors.accentGreen}, ${colors.accentBlue})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: '#000',
            }}
          >
            {initials}
          </motion.div>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.textSecondary }}>
            {displayName}
          </span>
          <motion.span
            animate={{ rotate: showMenu ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 10, color: colors.textMuted }}
          >
            ▼
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMenu(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: space[2],
                  background: colors.bgCard, border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: radius.lg, padding: space[1], minWidth: 200, zIndex: 50,
                  boxShadow: shadows.lg,
                }}
              >
                <div style={{
                  padding: `${space[2]} ${space[3]}`, fontSize: 13, color: colors.textMuted,
                  borderBottom: `1px solid ${colors.borderSubtle}`, marginBottom: space[1],
                }}>
                  {user.email}
                </div>
                <motion.button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  whileHover={{ backgroundColor: colors.accentRedLight }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%', padding: `${space[2]} ${space[3]}`, borderRadius: radius.md,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 14, color: colors.accentRed, textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  {signingOut ? 'Signing out...' : 'Sign out'}
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}