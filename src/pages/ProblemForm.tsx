import { useState, useEffect, type FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import './ProblemForm.css'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ProblemForm() {
  const { user, isLoading } = useAuth()
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [problemDescription, setProblemDescription] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Protect route and auto-fill from session
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.hash = 'auth'
      return
    }
    
    if (user) {
      if (!email) setEmail(user.email ?? '')
      const meta = user.user_metadata
      if (meta?.company_name && !companyName) {
        setCompanyName(meta.company_name as string)
      }
    }
  }, [user, isLoading])

  // Prevent flash of form content while redirecting or loading
  if (isLoading || (!isLoading && !user)) {
    return null
  }

  const resetForm = () => {
    setCompanyName('')
    setEmail('')
    setProblemDescription('')
    setStatus('idle')
    setErrorMessage('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { error } = await supabase.from('support_requests').insert({
      user_id: user?.id,
      company_name: companyName,
      email,
      problem_description: problemDescription,
    })

    if (error) {
      if (error.message.includes('JWT expired') || error.message.includes('Invalid token')) {
        setErrorMessage('Your session has expired. Please sign in again.')
        // Optionally redirect to auth: window.location.hash = 'auth'
      } else {
        setErrorMessage(error.message)
      }
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  // ── Success state ──
  if (status === 'success') {
    return (
      <div className="problem-page">
        <div className="problem-card">
          <div className="problem-success">
            <svg
              className="problem-success-icon"
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
            <h3>Request submitted.</h3>
            <p>
              We've received your compliance query. A member of our team will review it
              and get back to you within one business day.
            </p>
          </div>
          <div className="problem-actions">
            <button type="button" className="btn btn-primary" onClick={resetForm}>
              Submit another request
            </button>
            <a href="#home" className="btn-ghost-link">
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── Form state ──
  return (
    <div className="problem-page">
      <div className="problem-card">
        <div className="problem-header">
          <div className="eyebrow">Support request</div>
          <h2>Tell us what you need help with.</h2>
          <p>
            Describe your compliance problem and we'll match you with the right advisor.
          </p>
        </div>

        {status === 'error' && errorMessage && (
          <div className="problem-error">{errorMessage}</div>
        )}

        <form className="problem-form" onSubmit={handleSubmit}>
          <div className="problem-field">
            <label htmlFor="pf-company">Company name</label>
            <input
              id="pf-company"
              type="text"
              placeholder="e.g. Riverstone Exports"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="problem-field">
            <label htmlFor="pf-email">Email</label>
            <input
              id="pf-email"
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="problem-field">
            <label htmlFor="pf-description">Describe your problem</label>
            <textarea
              id="pf-description"
              placeholder="What compliance issue are you facing? The more detail you provide, the faster we can help."
              required
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
            />
          </div>

          <div className="problem-submit">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting…' : 'Submit request'}
            </button>
          </div>
        </form>

        <div className="problem-back">
          <a href="#home">← Back to home</a>
        </div>
      </div>
    </div>
  )
}
