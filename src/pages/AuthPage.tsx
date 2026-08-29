import { useState, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import './AuthPage.css'

type Mode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setCompanyName('')
    setPhoneNumber('')
    setError(null)
  }

  const switchMode = (next: Mode) => {
    resetForm()
    setSuccess(null)
    setMode(next)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const sanitizedEmail = email.trim().toLowerCase()

      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: sanitizedEmail,
          password,
        })
        if (signInError) throw signInError
        window.location.hash = 'home'
        return
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: sanitizedEmail,
          password,
          options: {
            data: {
              company_name: companyName,
              phone_number: phoneNumber,
            },
          },
        })
        if (signUpError) throw signUpError
        setSuccess('signup')
      }
    } catch (err: unknown) {
      let message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      
      // Friendly error mapping
      if (message.includes('User already registered')) {
        message = 'An account with this email already exists.'
      } else if (message.includes('Invalid login credentials')) {
        message = 'Incorrect email or password.'
      } else if (message.includes('Email not confirmed')) {
        message = 'Please confirm your email address before logging in.'
      }

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // ── Success state ──
  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="brand-name">Plauma</div>
            <div className="brand-tagline">Compliance, handled</div>
          </div>
          <div className="auth-success">
            <svg
              className="auth-success-icon"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="56" stroke="#1D4ED8" strokeWidth="2.5" />
              <circle cx="60" cy="60" r="46" stroke="#1D4ED8" strokeWidth="1.2" />
              <path
                d="M42 61 L54 73 L80 47"
                stroke="#1D4ED8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <h3>Account created.</h3>
            <p>
              Check your email for a confirmation link, then you're all set.
            </p>
          </div>
          <div className="auth-submit" style={{ marginTop: '24px' }}>
            <a href="#home" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
              Continue to Plauma →
            </a>
          </div>
          <div className="auth-back">
            <a href="#auth" onClick={() => { setSuccess(null); switchMode('login') }}>← Sign in instead</a>
          </div>
        </div>
      </div>
    )
  }

  // ── Form state ──
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-name">Plauma</div>
          <div className="brand-tagline">Compliance, handled</div>
        </div>

        <h2 className="auth-heading">
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="auth-subtext">
          {mode === 'login'
            ? 'Welcome back. Enter your credentials below.'
            : 'Get started with a free compliance health check.'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === 'signup' && (
            <>
              <div className="auth-divider">
                <span>Company details</span>
              </div>

              <div className="auth-field">
                <label htmlFor="auth-company">Company name</label>
                <input
                  id="auth-company"
                  type="text"
                  placeholder="e.g. Riverstone Exports"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-phone">Phone number</label>
                <input
                  id="auth-phone"
                  type="tel"
                  placeholder="+91"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="auth-submit">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </div>
        </form>

        <div className="auth-toggle">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button type="button" onClick={() => switchMode('signup')}>
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => switchMode('login')}>
                Sign in
              </button>
            </>
          )}
        </div>

        <div className="auth-back">
          <a href="#home">← Back to home</a>
        </div>
      </div>
    </div>
  )
}
