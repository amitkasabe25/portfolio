'use client'

import { useAuthContext } from '../context/AuthContext'

/** Thin wrapper — reads from the global AuthContext. */
export function useAuth() {
  return useAuthContext()
}
