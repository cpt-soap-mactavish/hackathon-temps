"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PageWrapper } from "@/components/PageWrapper"

function VerifyContent() {
    const [status, setStatus] = useState("loading") // loading, success, error
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            setStatus("error")
            return
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                })

                if (res.ok) {
                    setStatus("success")
                } else {
                    setStatus("error")
                }
            } catch (error) {
                setStatus("error")
            }
        }

        verifyEmail()
    }, [token])

    return (
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Email Verification
                </CardTitle>
                <CardDescription>
                    Verifying your email address...
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
                {status === "loading" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Please wait...</p>
                    </motion.div>
                )}

                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                        <p className="text-center text-muted-foreground">
                            Your email has been successfully verified! You can now log in.
                        </p>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <XCircle className="h-12 w-12 text-destructive" />
                        <p className="text-center text-muted-foreground">
                            Verification failed. The token might be invalid or expired.
                        </p>
                    </motion.div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button asChild className="w-full">
                    <Link href="/login">
                        {status === "success" ? "Go to Login" : "Back to Login"}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function VerifyPage() {
    return (
        <PageWrapper className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyContent />
            </Suspense>
        </PageWrapper>
    )
}
