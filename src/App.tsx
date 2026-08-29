import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import ProblemForm from './pages/ProblemForm'
import { AuthProvider } from './lib/AuthContext'

function getPage(): string {
  return window.location.hash.replace('#', '') || 'home'
}

function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const onHashChange = () => setPage(getPage())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <AuthProvider>
      {page === 'auth' ? (
        <AuthPage />
      ) : page === 'support' ? (
        <ProblemForm />
      ) : (
        <LandingPage />
      )}
    </AuthProvider>
  )
}

export default App
