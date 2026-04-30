'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedContainer } from '@/components/AnimatedContainer'
import { space, radius, colors, shadows } from '@/lib/cssVars'

export default function HomePage() {
  return (
    <div style={{ background: colors.bgPrimary, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${colors.borderSubtle}`,
        }}
      >
        <nav style={{
          maxWidth: 1200, margin: '0 auto', padding: `0 ${space[6]}`,
          height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ fontSize: 22, fontWeight: 800, color: colors.accentGreen, letterSpacing: '-0.02em' }}
          >
            ◆ TaskFlow
          </motion.span>
          <div style={{ display: 'flex', gap: space[3], alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth/login" style={{
                padding: '10px 22px', borderRadius: radius.md, fontSize: 14, fontWeight: 500,
                color: colors.textSecondary, border: `1px solid ${colors.borderSubtle}`,
                textDecoration: 'none', display: 'inline-block',
              }}>
                Sign in
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth/signup" style={{
                padding: '10px 22px', borderRadius: radius.md, fontSize: 14, fontWeight: 600,
                color: '#000', background: colors.accentGreen,
                textDecoration: 'none', display: 'inline-block',
              }}>
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Hero */}
      <section style={{
        maxWidth: 960, margin: '0 auto', padding: `180px ${space[6]} ${space[16]}`,
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <AnimatedContainer animation="fadeInUp" delay={0.2}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'inline-block', padding: '8px 18px', borderRadius: radius.full,
              background: colors.accentGreenLight, border: '1px solid rgba(16,185,129,0.3)',
              fontSize: 13, fontWeight: 600, color: colors.accentGreen, marginBottom: space[6],
              backdropFilter: 'blur(10px)',
            }}
          >
            ✨ Collaborative Task Management
          </motion.div>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.4}>
          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: space[6],
            color: colors.textPrimary,
            letterSpacing: '-0.03em',
          }}>
            Manage Projects.<br />Ship Faster.
          </h1>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.5}>
          <p style={{
            fontSize: 19, color: colors.textSecondary, maxWidth: 600,
            margin: `0 auto ${space[10]}`, lineHeight: 1.7, fontWeight: 400,
          }}>
            Create projects, assign tasks, track progress, and collaborate with your team — all in one place. Simple, fast, and beautiful.
          </p>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.6}>
          <div style={{ display: 'flex', gap: space[4], justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth/signup" style={{
                padding: '16px 36px', borderRadius: radius.lg, fontSize: 16, fontWeight: 600,
                color: '#000', background: colors.accentGreen,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: space[2],
                boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
              }}>
                Start Free <span style={{ fontSize: 18 }}>→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, borderColor: colors.borderHover }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth/login" style={{
                padding: '16px 36px', borderRadius: radius.lg, fontSize: 16, fontWeight: 500,
                color: colors.textPrimary, border: `1px solid ${colors.borderSubtle}`,
                textDecoration: 'none', display: 'inline-block',
                background: 'rgba(255,255,255,0.03)',
              }}>
                Sign In
              </Link>
            </motion.div>
          </div>
        </AnimatedContainer>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: `${space[10]} ${space[6]} ${space[16]}`, position: 'relative', zIndex: 1 }}>
        <AnimatedContainer animation="fadeInUp" delay={0.7}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: space[5],
          }}>
            {[
              { icon: '📁', title: 'Project Management', desc: 'Create projects with teams. Admin and Member roles with proper access control.', color: colors.accentBlue },
              { icon: '✅', title: 'Task Tracking', desc: 'Kanban-style boards with To Do, In Progress, and Done columns. Priorities and due dates.', color: colors.accentGreen },
              { icon: '📊', title: 'Dashboard Analytics', desc: 'Real-time stats on tasks by status, overdue items, and team productivity at a glance.', color: colors.accentPurple },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6, boxShadow: shadows.lg }}
                style={{
                  background: colors.bgCard,
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: radius.xl, padding: space[8],
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    fontSize: 40, marginBottom: space[4],
                    display: 'inline-block',
                  }}
                >
                  {f.icon}
                </motion.div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: space[2], color: f.color, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        style={{
          borderTop: `1px solid ${colors.borderSubtle}`, padding: `${space[8]} ${space[6]}`,
          textAlign: 'center', fontSize: 13, color: colors.textMuted,
          background: 'rgba(10,10,18,0.5)', backdropFilter: 'blur(10px)',
        }}
      >
        Built with Next.js & Firebase • TaskFlow © 2026
      </motion.footer>
    </div>
  )
}
