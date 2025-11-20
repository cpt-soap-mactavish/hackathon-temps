"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Mail, Lock, Save, Loader2, Camera } from "lucide-react"
import { toast } from "sonner"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/Navbar"
import { PageWrapper } from "@/components/PageWrapper"

export default function ProfilePage() {
    const { data: session, update, status } = useSession()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        image: "",
    })
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated") {
            const fetchProfile = async () => {
                try {
                    const res = await fetch("/api/user/profile")
                    if (res.ok) {
                        const data = await res.json()
                        setUser({
                            name: data.name || "",
                            email: data.email || "",
                            image: data.image || "",
                        })
                    }
                } catch (error) {
                    toast.error("Failed to load profile")
                } finally {
                    setIsLoading(false)
                }
            }
            fetchProfile()
        }
    }, [status, router, session])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    image: user.image,
                }),
            })

            if (res.ok) {
                const data = await res.json()
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        name: data.user.name,
                        image: data.user.image
                    }
                })
                toast.success("Profile updated successfully")
            } else {
                const data = await res.json()
                toast.error(data.message || "Failed to update profile")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSaving(false)
        }
    }

    const handlePasswordUpdate = async (e) => {
        e.preventDefault()
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match")
            return
        }

        setIsSaving(true)

        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                }),
            })

            if (res.ok) {
                toast.success("Password updated successfully")
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" })
            } else {
                const data = await res.json()
                toast.error(data.message || "Failed to update password")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <PageWrapper className="flex flex-col min-h-screen w-full bg-background">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full grid gap-8 md:grid-cols-[1fr_2fr]"
                >
                    {/* Sidebar / Avatar Section */}
                    <div className="space-y-6">
                        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                            <CardContent className="flex flex-col items-center pt-6">
                                <div className="relative mb-4">
                                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                        <AvatarImage src={user.image || session?.user?.image} />
                                        <AvatarFallback className="text-4xl">
                                            {user.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Placeholder for future image upload */}
                                    {/* <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-lg">
                    <Camera className="h-4 w-4" />
                  </Button> */}
                                </div>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Profile Details */}
                        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>Update your personal information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Display Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="name"
                                                value={user.name}
                                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                value={user.email}
                                                disabled
                                                className="pl-9 bg-muted/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Password Update - Only show if user has a password (not Google auth) */}
                        {/* We can check this by seeing if the user has an image from Google, or better, the API handles the error. 
                For UI, we can just show it and let the API reject if it's OAuth. 
                Or we could pass a flag from the API. For now, let's show it. */}
                        <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                                <CardDescription>Update your password</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="currentPassword"
                                                type="password"
                                                value={passwords.currentPassword}
                                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input
                                                id="newPassword"
                                                type="password"
                                                value={passwords.newPassword}
                                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                value={passwords.confirmPassword}
                                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit" variant="outline" disabled={isSaving}>
                                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Update Password
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}
