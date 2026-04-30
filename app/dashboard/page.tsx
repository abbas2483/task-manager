'use client'

export const dynamic = 'force-dynamic'

import { space, radius, colors, shadows } from '@/lib/cssVars'

import { useState, useEffect, useMemo, memo } from 'react'
import { getDashboardStats } from '@/lib/firebase/tasks'
import { getProjects } from '@/lib/firebase/projects'
import { useAuth } from '@/lib/firebase/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedContainer } from '@/components/AnimatedContainer'

// Memoized stat card component
const StatCard = memo(({ stat, index }: { stat: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    whileHover={{ y: -4, boxShadow: shadows.md }}
    style={{
      background: colors.bgCard, 
      border: `2px solid ${colors.borderSubtle}`,
      borderRadius: radius.lg, 
      padding: space[5],
      transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      boxShadow: shadows.sm,
    }}
  >
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: space[3],
    }}>
      <span style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {stat.label}
      </span>
      <motion.span
        whileHover={{ scale: 1.1, rotate: 5 }}
        style={{
          width: 32, height: 32, borderRadius: radius.md,
          background: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: stat.color, fontWeight: 700,
          border: `1px solid color-mix(in srgb, ${stat.color} 25%, transparent)`,
        }}
      >
        {stat.icon}
      </motion.span>
    </div>
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
      style={{ fontSize: 36, fontWeight: 800, color: stat.color, letterSpacing: '-0.02em' }}
    >
      {stat.value}
    </motion.div>
  </motion.div>
))

StatCard.displayName = 'StatCard'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    doneTasks: 0,
    overdueTasks: 0
  })
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return

      const [statsData, projectsData] = await Promise.all([
        getDashboardStats(),
        getProjects(),
      ])

      setStats(statsData)
      setProjects(projectsData)
      setLoading(false)
    }

    if (user) load()
  }, [user])

  const recentProjects = useMemo(() => projects.slice(0, 4), [projects])

  const statCards = useMemo(() => [
    { label: 'Total Projects', value: stats.totalProjects, color: colors.accentBlue, icon: '◫' },
    { label: 'Total Tasks', value: stats.totalTasks, color: colors.accentGreen, icon: '✓' },
    { label: 'In Progress', value: stats.inProgressTasks, color: colors.accentOrange, icon: '◎' },
    { label: 'Overdue', value: stats.overdueTasks, color: colors.accentRed, icon: '!' },
  ], [stats])

  const handleExportData = () => {
    try {
      const csvRows = []
      
      csvRows.push('Dashboard Report')
      csvRows.push(`Generated: ${new Date().toLocaleString()}`)
      csvRows.push(`User: ${user?.email || 'Unknown'}`)
      csvRows.push('')
      
      csvRows.push('STATISTICS SUMMARY')
      csvRows.push('Metric,Value')
      csvRows.push(`Total Projects,${stats.totalProjects}`)
      csvRows.push(`Total Tasks,${stats.totalTasks}`)
      csvRows.push(`To Do Tasks,${stats.todoTasks}`)
      csvRows.push(`In Progress Tasks,${stats.inProgressTasks}`)
      csvRows.push(`Done Tasks,${stats.doneTasks}`)
      csvRows.push(`Overdue Tasks,${stats.overdueTasks}`)
      csvRows.push('')
      
      csvRows.push('PROJECTS LIST')
      csvRows.push('Project Name,Total Tasks,Members')
      
      projects.forEach(project => {
        csvRows.push(`"${project.name}",${project.task_count || 0},${project.member_count || 0}`)
      })
      
      const csvContent = csvRows.join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `dashboard-report-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  if (loading) {
    return (
      <div>
        <div style={{ width: 280, height: 36, borderRadius: radius.md, background: colors.bgCard, marginBottom: space[8] }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: space[4], marginBottom: space[8] }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{ height: 130, borderRadius: radius.lg, background: colors.bgCard }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome */}
      <AnimatedContainer animation="fadeInUp" delay={0.1}>
        <div style={{ marginBottom: space[8], display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space[4] }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: space[1], letterSpacing: '-0.02em' }}>
              Welcome back, {user?.displayName || 'User'} 👋
            </h1>
            <p style={{ color: colors.textMuted, fontSize: 15 }}>
              Here's an overview of your projects and tasks.
            </p>
          </div>
          <button
            onClick={handleExportData}
            style={{
              padding: '10px 20px',
              background: colors.accentGreen,
              color: '#000',
              border: 'none',
              borderRadius: radius.md,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: space[2],
            }}
          >
            <span>📥</span> Export Data
          </button>
        </div>
      </AnimatedContainer>

      {/* Stats Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: space[4], marginBottom: space[8],
      }}>
        {statCards.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} />
        ))}
      </div>

      {/* Task Status Breakdown */}
      {stats.totalTasks > 0 && (
        <AnimatedContainer animation="fadeInUp" delay={0.6}>
          <div style={{
            background: colors.bgCard, 
            border: `2px solid ${colors.borderSubtle}`,
            borderRadius: radius.lg, 
            padding: space[5], 
            marginBottom: space[8],
            boxShadow: shadows.sm,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: space[4], letterSpacing: '-0.01em' }}>Task Breakdown</h2>
            <div style={{ display: 'flex', gap: 4, height: 12, borderRadius: radius.sm, overflow: 'hidden', marginBottom: space[3], border: `1px solid ${colors.borderSubtle}` }}>
              {stats.doneTasks > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.doneTasks / stats.totalTasks) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: colors.accentGreen, borderRadius: radius.sm,
                  }}
                />
              )}
              {stats.inProgressTasks > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.inProgressTasks / stats.totalTasks) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: colors.accentOrange, borderRadius: radius.sm,
                  }}
                />
              )}
              {stats.todoTasks > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.todoTasks / stats.totalTasks) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: colors.borderHover, borderRadius: radius.sm,
                  }}
                />
              )}
            </div>
            <div style={{ display: 'flex', gap: space[5], fontSize: 13, color: colors.textMuted, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: space[2] }}>
                <span style={{ width: 10, height: 10, borderRadius: radius.sm, background: colors.accentGreen, border: `1px solid ${colors.accentGreen}` }} />
                Done ({stats.doneTasks})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: space[2] }}>
                <span style={{ width: 10, height: 10, borderRadius: radius.sm, background: colors.accentOrange, border: `1px solid ${colors.accentOrange}` }} />
                In Progress ({stats.inProgressTasks})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: space[2] }}>
                <span style={{ width: 10, height: 10, borderRadius: radius.sm, background: colors.borderHover, border: `1px solid ${colors.borderHover}` }} />
                To Do ({stats.todoTasks})
              </span>
            </div>
          </div>
        </AnimatedContainer>
      )}

      {/* Recent Projects + Quick Actions */}
      <div className="dashboard-grid">
        <AnimatedContainer animation="fadeInUp" delay={0.7}>
          <div style={{
            background: colors.bgCard, 
            border: `2px solid ${colors.borderSubtle}`,
            borderRadius: radius.lg, 
            padding: space[5],
            boxShadow: shadows.sm,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: space[4] }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>Recent Projects</h2>
              <Link href="/dashboard/projects" style={{
                fontSize: 13, color: colors.accentGreen, textDecoration: 'none', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                View all <span style={{ fontSize: 14 }}>→</span>
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: `${space[8]} 0`, color: colors.textMuted, fontSize: 14 }}>
                No projects yet. Create one to get started!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: space[2] }}>
                {recentProjects.map((p: any, i: number) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: colors.bgHover }}
                  >
                    <Link
                      href={`/dashboard/projects/${p.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: `${space[3]} ${space[4]}`, borderRadius: radius.md,
                        background: colors.bgElevated, textDecoration: 'none',
                        border: `1px solid ${colors.borderSubtle}`,
                        transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, marginBottom: 2 }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 12, color: colors.textMuted }}>
                          {p.task_count} tasks · {p.member_count} members
                        </div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: radius.sm,
                        background: p.user_role === 'admin' ? colors.accentPurpleLight : colors.accentBlueLight,
                        color: p.user_role === 'admin' ? colors.accentPurple : colors.accentBlue,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        border: `1px solid ${p.user_role === 'admin' ? colors.accentPurple : colors.accentBlue}33`,
                      }}>
                        {p.user_role}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeInUp" delay={0.8}>
          <div style={{
            background: colors.bgCard, 
            border: `2px solid ${colors.borderSubtle}`,
            borderRadius: radius.lg, 
            padding: space[5],
            boxShadow: shadows.sm,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: space[4], letterSpacing: '-0.01em' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: space[3] }}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/dashboard/projects/new" style={{
                  display: 'flex', alignItems: 'center', gap: space[3],
                  padding: `${space[4]} ${space[4]}`, borderRadius: radius.md,
                  background: colors.accentGreenLight, 
                  border: `2px solid ${colors.accentGreen}`,
                  textDecoration: 'none', fontSize: 14, fontWeight: 600, 
                  color: colors.accentGreen,
                  boxShadow: `0 2px 8px ${colors.accentGreen}33`,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>+</span> New Project
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/dashboard/projects" style={{
                  display: 'flex', alignItems: 'center', gap: space[3],
                  padding: `${space[3]} ${space[4]}`, borderRadius: radius.md,
                  background: colors.bgElevated, 
                  border: `1px solid ${colors.borderSubtle}`,
                  textDecoration: 'none', fontSize: 14, fontWeight: 500, 
                  color: colors.textSecondary,
                }}>
                  <span style={{ fontSize: 16 }}>◫</span> Browse Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/dashboard/settings" style={{
                  display: 'flex', alignItems: 'center', gap: space[3],
                  padding: `${space[3]} ${space[4]}`, borderRadius: radius.md,
                  background: colors.bgElevated, 
                  border: `1px solid ${colors.borderSubtle}`,
                  textDecoration: 'none', fontSize: 14, fontWeight: 500, 
                  color: colors.textSecondary,
                }}>
                  <span style={{ fontSize: 16 }}>⚙</span> Settings
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  )
}
