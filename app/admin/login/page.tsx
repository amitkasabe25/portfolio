"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { createClient } from "../../lib/supabase/client"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setLoading(true)
        setError(null)
        try {
            const supabase = createClient()
            const { data, error: signError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signError) {
                setError(signError.message)
                return
            }

            // redirect after login using App Router and refresh server auth state
            router.push("/admin")
            router.refresh()
        } catch (e: any) {
            setError(e?.message ?? "An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Admin sign in</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border p-2"
                            placeholder="you@company.com"
                            type="email"
                            autoComplete="email"
                        />

                        <label className="text-sm font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border p-2"
                            placeholder="••••••••"
                            type="password"
                            autoComplete="current-password"
                        />

                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                </CardContent>

                <CardFooter>
                    <div className="w-full flex justify-end">
                        <Button onClick={handleLogin} disabled={loading}>
                            {loading ? "Signing in…" : "Sign in"}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}