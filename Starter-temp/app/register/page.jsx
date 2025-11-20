"use client"
"use client"

"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { signIn, useSession } from "next-auth/react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/Navbar"
import { PageWrapper } from "@/components/PageWrapper"

export default function RegisterPage() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = React.useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    React.useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile")
        }
    }, [status, router])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setIsLoading(false)
            toast.error("Passwords do not match", {
                description: "Please ensure both passwords are the same.",
            })
            return
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await res.json()
            setIsLoading(false)

            if (res.ok) {
                toast.success("Account created!", {
                    description: "Please check your email to verify your account before logging in.",
                    duration: 5000,
                })
                router.push("/login")
            } else {
                toast.error("Registration failed", {
                    description: data.message || "Please try again later.",
                })
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("Something went wrong", {
                description: "Please check your connection and try again.",
            })
        }
    }

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true)
        await signIn("google", { callbackUrl: "/" })
    }

    return (
        <PageWrapper className="min-h-screen w-full bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50" />
            <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/20 to-transparent blur-3xl -z-10" />

            <Navbar />

            <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 md:px-8 py-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <Card className="w-full border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/10 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Enter your details to join the platform
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/50 transition-all duration-300 group-hover:border-primary/50"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/50 transition-all duration-300 group-hover:border-primary/50"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="pl-9 pr-9 bg-background/50 border-border/50 focus-visible:ring-primary/50 transition-all duration-300 group-hover:border-primary/50"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-primary hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                            <span className="sr-only">Toggle password visibility</span>
                                        </Button>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/50 transition-all duration-300 group-hover:border-primary/50"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="relative my-4"
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/50" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full border-border/50 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                                    onClick={handleGoogleLogin}
                                    disabled={isGoogleLoading}
                                >
                                    {isGoogleLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                    )}
                                    Google
                                </Button>
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 text-center">
                            <div className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                                >
                                    Log in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </PageWrapper>
    )
}
