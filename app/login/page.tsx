"use client"

import Link from "next/link"
import GoogleLogin from "../components/GoogleLogin"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Sign in to continue</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
          <GoogleLogin />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          <Link
            href="/"
            className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
