import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'
import './Navbar.css'

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { session, user, isLoading } = useAuth()
  const isLoggedIn = !!session
  const companyName = user?.user_metadata?.company_name

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.hash = 'home'
  }

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <a href="#home" className="brand">
          <svg className="seal" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18.5" stroke="var(--brass)" strokeWidth="1.4" />
            <circle cx="20" cy="20" r="13.5" stroke="var(--brass)" strokeWidth="1" />
            <text x="20" y="25" textAnchor="middle" fontFamily="var(--mono)" fontSize="13" fill="var(--ink)">
              P
            </text>
          </svg>
          <span className="brand-name">Plauma</span>
        </a>
        
        <div className={`nav-links ${isMobileNavOpen ? 'open' : ''}`}>
          <a href="#pain-points" onClick={() => setIsMobileNavOpen(false)}>Services</a>
          <a href="#process" onClick={() => setIsMobileNavOpen(false)}>How it works</a>
          <a href="#team" onClick={() => setIsMobileNavOpen(false)}>Team</a>
        </div>
        
        <div className="nav-cta">
          {!isLoading && (
            isLoggedIn ? (
              <>
                {companyName && (
                  <span style={{ fontSize: '13px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-ink)' }}>
                    {companyName}
                  </span>
                )}
                <a href="#support" className="btn btn-primary" style={{ padding: '9px 16px' }}>Register</a>
                <button onClick={handleSignOut} className="btn btn-outline" style={{ padding: '9px 16px' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a href="#auth" className="btn btn-primary" style={{ padding: '9px 16px' }}>Sign In</a>
              </>
            )
          )}

          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  )
}
