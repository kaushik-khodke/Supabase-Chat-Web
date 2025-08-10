import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Sessions from './pages/Sessions'
import Chat from './pages/Chat'

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Sessions user={user} />} />
      <Route path="/chat/:id" element={<Chat user={user} />} />
    </Routes>
  )
}
