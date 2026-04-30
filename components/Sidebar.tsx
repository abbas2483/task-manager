'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { space, radius, colors } from '@/lib/cssVars'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '⬡' },
  { name: 'Projects', href: '/dashboard/projects', icon: '◫' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: 260, zIndex: 50,
      background: colors.bgSecondary, borderRight: `1px solid ${colors.borderSubtle}`,
      display: 'flex', flexDirection: 'column', padding: `${space[5]} ${space[3]}`,
    }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/dashboard" style={{
          fontSize: 20, fontWeight: 800, color: colors.accentGreen,
          textDecoration: 'none', padding: `0 ${space[3]}`, marginBottom: space[8],
          display: 'flex', alignItems: 'center', gap: space[2],
          letterSpacing: '-0.02em',
        }}>
          ◆ TaskFlow
        </Link>
      </motion.div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: space[1], flex: 1 }}>
        {navItems.map((item, i) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <Link
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: space[3],
                  padding: `${space[3]} ${space[3]}`, borderRadius: radius.md, fontSize: 15, fontWeight: 600,
                  textDecoration: 'none',
                  color: isActive ? colors.accentGreen : colors.textSecondary,
                  background: isActive ? colors.accentGreenLight : 'transparent',
                  border: isActive ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.name}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </aside>
  )
}