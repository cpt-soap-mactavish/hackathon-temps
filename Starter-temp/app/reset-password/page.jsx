"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Eye, EyeOff, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PageWrapper } from "@/components/PageWrapper"
import { toast } from "sonner"

function ResetPasswordContent() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (!token) {
            toast.error("Missing reset token")
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Password reset successfully!")
                router.push("/login")
            } else {
                toast.error(data.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to reset password")
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <Card className="w-full max-w-md border-destructive/50 bg-destructive/10 backdrop-blur-xl">
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <Lock className="mb-4 h-12 w-12 text-destructive" />
                    <h3 className="text-lg font-semibold text-destructive">Invalid Link</h3>
                    <p className="text-muted-foreground">
                        This password reset link is invalid or missing.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function ResetPasswordPage() {
    return (
        <PageWrapper className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </PageWrapper>
    )
}
