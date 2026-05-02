import React from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />
  return children
}
