'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
          }}>
            T
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#1a202c' }}>TaskFlow</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/auth/login" style={{
            padding: '10px 24px',
            fontSize: 14,
            fontWeight: 600,
            color: '#4a5568',
            textDecoration: 'none',
          }}>
            Sign in
          </Link>
          <Link href="/auth/signup" style={{
            padding: '10px 24px',
            background: '#3b82f6',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: '#1a202c',
            lineHeight: 1.2,
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}>
            Smarter <span style={{ color: '#3b82f6' }}>Project Management</span><br />
            for Remote Teams
          </h1>
          <p style={{
            fontSize: 18,
            color: '#718096',
            maxWidth: 600,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            All your tasks, team, and timelines in one place. Collaborate in real-time and stay organized effortlessly.
          </p>
          <Link href="/auth/signup" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: '#3b82f6',
            color: '#fff',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
          }}>
            Start Free Trial
          </Link>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginTop: 60,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            background: '#f7fafc',
            padding: 24,
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{
                flex: 1,
                background: '#3b82f6',
                borderRadius: 12,
                padding: 24,
                color: '#fff',
              }}>
                <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>Total Projects</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>24</div>
              </div>
              <div style={{
                flex: 1,
                background: '#f7fafc',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #e2e8f0',
              }}>
                <div style={{ fontSize: 14, color: '#718096', marginBottom: 8 }}>Active Tasks</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1a202c' }}>156</div>
              </div>
              <div style={{
                flex: 1,
                background: '#f7fafc',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #e2e8f0',
              }}>
                <div style={{ fontSize: 14, color: '#718096', marginBottom: 8 }}>Team Members</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#1a202c' }}>12</div>
              </div>
            </div>
            <div style={{
              background: '#f7fafc',
              borderRadius: 12,
              padding: 20,
              textAlign: 'left',
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1a202c', marginBottom: 16 }}>Recent Activity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    background: '#fff',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: '#3b82f6',
                      opacity: 0.1,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a202c' }}>Task Updated</div>
                      <div style={{ fontSize: 12, color: '#718096' }}>2 hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why TaskFlow Section */}
      <section style={{
        background: '#f7fafc',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 42px)',
            fontWeight: 800,
            color: '#1a202c',
            marginBottom: 16,
          }}>
            Why TaskFlow?
          </h2>
          <p style={{
            fontSize: 18,
            color: '#718096',
            maxWidth: 600,
            margin: '0 auto 60px',
          }}>
            Everything you need to manage projects and collaborate with your team
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}>
            {[
              {
                icon: '📊',
                title: 'Track Tasks Visually',
                desc: 'Monitor team boards for organized workflow',
              },
              {
                icon: '⏰',
                title: 'Stay on Schedule',
                desc: 'Never miss a deadline with real-time updates',
              },
              {
                icon: '👥',
                title: 'Collaborate in Real Time',
                desc: 'Work together seamlessly from anywhere',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'center',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a202c',
                  marginBottom: 12,
                }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 15, color: '#718096', lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 800,
              color: '#1a202c',
              marginBottom: 20,
              lineHeight: 1.3,
            }}>
              Real time collaboration<br />& updates
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {[
                'Collaborate in real time and stay aligned with live updates and instant notifications',
                'Assign tasks to your team with real-time collaboration and auto-refreshing updates',
                'Instant updates, shared progress indicators and easier and faster',
              ].map((item, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 12,
                  fontSize: 15,
                  color: '#4a5568',
                  lineHeight: 1.6,
                }}>
                  <span style={{ color: '#3b82f6', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 16,
            padding: 32,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 18,
            fontWeight: 600,
          }}>
            Dashboard Preview
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        background: '#f7fafc',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 42px)',
            fontWeight: 800,
            color: '#1a202c',
            marginBottom: 16,
          }}>
            <span style={{ color: '#3b82f6' }}>Tailored Packages</span> For<br />your Needs
          </h2>
          <div style={{
            display: 'inline-flex',
            gap: 8,
            background: '#fff',
            padding: 4,
            borderRadius: 8,
            marginBottom: 60,
            border: '1px solid #e2e8f0',
          }}>
            <button style={{
              padding: '8px 24px',
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Monthly
            </button>
            <button style={{
              padding: '8px 24px',
              background: 'transparent',
              color: '#718096',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Yearly
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                name: 'Basic',
                price: '$59',
                features: ['Multi-step Task', '3 Premium Apps', '3 Users teams'],
                color: '#fff',
                textColor: '#1a202c',
              },
              {
                name: 'Professional',
                price: '$129',
                features: ['Multi-step Task', 'Unlimited Apps', 'Unlimited Users teams', 'Advanced Admin'],
                color: '#3b82f6',
                textColor: '#fff',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '$99',
                features: ['Multi-step Task', '5 Premium Apps', '50 Users teams', 'Shared Workspace'],
                color: '#fff',
                textColor: '#1a202c',
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                style={{
                  background: plan.color,
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'left',
                  border: plan.popular ? 'none' : '1px solid #e2e8f0',
                  boxShadow: plan.popular ? '0 20px 40px rgba(59, 130, 246, 0.3)' : 'none',
                  position: 'relative',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#10b981',
                    color: '#fff',
                    padding: '4px 16px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                    Most Popular
                  </div>
                )}
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: plan.textColor,
                  marginBottom: 16,
                }}>
                  {plan.name}
                </div>
                <div style={{
                  fontSize: 42,
                  fontWeight: 800,
                  color: plan.textColor,
                  marginBottom: 8,
                }}>
                  {plan.price}
                  <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.7 }}>/month</span>
                </div>
                <div style={{
                  fontSize: 14,
                  color: plan.textColor,
                  opacity: 0.7,
                  marginBottom: 24,
                }}>
                  Unleash the power of automation
                </div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      gap: 8,
                      fontSize: 14,
                      color: plan.textColor,
                      opacity: 0.9,
                    }}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: plan.popular ? '#fff' : '#3b82f6',
                  color: plan.popular ? '#3b82f6' : '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  Choose plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a202c',
        color: '#fff',
        padding: '60px 24px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 40,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                  T
                </div>
                <span style={{ fontSize: 20, fontWeight: 700 }}>TaskFlow</span>
              </div>
              <p style={{ fontSize: 14, color: '#a0aec0', lineHeight: 1.6 }}>
                Start managing smarter today.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Menu</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Home', 'Features', 'Pricing', 'About'].map((item) => (
                  <a key={item} href="#" style={{
                    fontSize: 14,
                    color: '#a0aec0',
                    textDecoration: 'none',
                  }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Help</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Support', 'Documentation', 'Contact'].map((item) => (
                  <a key={item} href="#" style={{
                    fontSize: 14,
                    color: '#a0aec0',
                    textDecoration: 'none',
                  }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Newsletter</h4>
              <p style={{ fontSize: 14, color: '#a0aec0', marginBottom: 12 }}>
                Subscribe to get updates
              </p>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid #4a5568',
                  background: '#2d3748',
                  color: '#fff',
                  fontSize: 14,
                }}
              />
            </div>
          </div>
          <div style={{
            borderTop: '1px solid #4a5568',
            paddingTop: 24,
            textAlign: 'center',
            fontSize: 14,
            color: '#a0aec0',
          }}>
            © 2026 TaskFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
