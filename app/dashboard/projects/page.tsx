'use client'

export const dynamic = 'force-dynamic'

import { space, radius, colors, shadows } from '@/lib/cssVars'

import { useState, useEffect, memo } from 'react'
import { getProjects } from '@/lib/firebase/projects'
import { useAuth } from '@/lib/firebase/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedContainer } from '@/components/AnimatedContainer'
import { AnimatedButton } from '@/components/AnimatedButton'

// Memoized project card component
const ProjectCard = memo(({ project, index }: { project: any; index: number }) => {
  const progress = project.task_count > 0
    ? Math.round((project.done_count / project.task_count) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, boxShadow: shadows.lg }}
    >
      <Link
        href={`/dashboard/projects/${project.id}`}
        style={{
          background: colors.bgCard, 
          border: `2px solid ${colors.borderSubtle}`,
          borderRadius: radius.lg, 
          padding: space[5], 
          textDecoration: 'none',
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: shadows.sm,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: space[3] }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary, letterSpacing: '-0.01em', flex: 1 }}>
            {project.name}
          </h3>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: radius.sm,
            background: project.user_role === 'admin' ? colors.accentPurpleLight : colors.accentBlueLight,
            color: project.user_role === 'admin' ? colors.accentPurple : colors.accentBlue,
            textTransform: 'uppercase', flexShrink: 0, letterSpacing: '0.05em',
            border: `1px solid ${project.user_role === 'admin' ? colors.accentPurple : colors.accentBlue}33`,
          }}>
            {project.user_role}
          </span>
        </div>

        {project.description && (
          <p style={{
            fontSize: 14, color: colors.textMuted, marginBottom: space[4],
            lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any,
          }}>
            {project.description}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: space[2], fontSize: 12, color: colors.textMuted, fontWeight: 600 }}>
            <span>{project.task_count} tasks</span>
            <span>{progress}% complete</span>
          </div>
          <div style={{ height: 8, borderRadius: radius.sm, background: colors.bgElevated, overflow: 'hidden', border: `1px solid ${colors.borderSubtle}` }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                height: '100%', borderRadius: radius.sm,
                background: progress === 100 ? colors.accentGreen : colors.accentBlue,
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: space[2], marginTop: space[3], fontSize: 12, color: colors.textMuted }}>
            <span>👥 {project.member_count} members</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return
      const data = await getProjects()
      setProjects(data)
      setLoading(false)
    }

    if (user) load()
  }, [user])

  if (loading) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ width: 240, height: 36, borderRadius: radius.md, background: colors.bgCard, marginBottom: space[8] }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: space[4] }}>
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{ height: 220, borderRadius: radius.lg, background: colors.bgCard }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <AnimatedContainer animation="fadeInUp" delay={0.1}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: space[8], flexWrap: 'wrap', gap: space[4] }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: space[1], letterSpacing: '-0.02em' }}>Projects</h1>
            <p style={{ color: colors.textMuted, fontSize: 15 }}>
              Manage your projects and collaborate with your team.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/projects/new" style={{
              padding: '14px 28px', 
              borderRadius: radius.md, 
              fontSize: 15, 
              fontWeight: 600,
              color: '#000', 
              background: colors.accentGreen,
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: space[2],
              boxShadow: `0 4px 16px ${colors.accentGreen}66`,
              border: `2px solid ${colors.accentGreen}`,
            }}>
              <span style={{ fontSize: 20, fontWeight: 700 }}>+</span> New Project
            </Link>
          </motion.div>
        </div>
      </AnimatedContainer>

      {projects.length === 0 ? (
        <AnimatedContainer animation="scaleIn" delay={0.3}>
          <div style={{
            textAlign: 'center', 
            padding: `${space[16]} ${space[6]}`,
            background: colors.bgCard, 
            border: `2px solid ${colors.borderSubtle}`,
            borderRadius: radius.xl,
            boxShadow: shadows.sm,
          }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
              style={{ fontSize: 56, marginBottom: space[4] }}
            >
              📁
            </motion.div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: space[2], letterSpacing: '-0.01em' }}>No projects yet</h3>
            <p style={{ color: colors.textMuted, fontSize: 15, marginBottom: space[6] }}>
              Create your first project to get started.
            </p>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/dashboard/projects/new" style={{
                padding: '14px 32px', 
                borderRadius: radius.md, 
                fontSize: 15, 
                fontWeight: 600,
                color: '#000', 
                background: colors.accentGreen,
                textDecoration: 'none', 
                display: 'inline-block',
                boxShadow: `0 4px 16px ${colors.accentGreen}66`,
                border: `2px solid ${colors.accentGreen}`,
              }}>
                Create Project
              </Link>
            </motion.div>
          </div>
        </AnimatedContainer>
      ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: space[4],
        }}>
          {projects.map((project: any, i: number) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
