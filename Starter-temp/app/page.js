"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Zap, Lock, User, Layout, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import { PageWrapper } from "@/components/PageWrapper"

export default function Home() {
  return (
    <PageWrapper className="flex flex-col min-h-screen w-full bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/20 to-transparent blur-3xl -z-10" />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 md:px-8 py-20 md:py-32 flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Secure Authentication for the Modern Web
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              A complete authentication solution built with Next.js 15, Tailwind CSS, and MongoDB. Secure, fast, and beautiful.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg border-primary/20 bg-background/50 backdrop-blur hover:bg-primary/10 hover:scale-105 transition-transform">
              <Link href="/login">
                Live Demo
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container px-4 md:px-8 py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Secure by Default"
              description="Built with industry-standard security practices. BCrypt hashing, secure sessions, and protected API routes."
              delay={0.3}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Lightning Fast"
              description="Optimized for performance with Next.js App Router and server-side rendering. Zero layout shift."
              delay={0.4}
            />
            <FeatureCard
              icon={<Layout className="h-8 w-8 text-primary" />}
              title="Modern UI/UX"
              description="Beautiful glassmorphism design with smooth animations using Framer Motion and Tailwind CSS."
              delay={0.5}
            />
            <FeatureCard
              icon={<User className="h-8 w-8 text-primary" />}
              title="User Profiles"
              description="Complete profile management system. Update details, change passwords, and manage sessions."
              delay={0.6}
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-primary" />}
              title="Auth Flows"
              description="Includes Email Verification, Forgot Password, and Google OAuth integration out of the box."
              delay={0.7}
            />
            <FeatureCard
              icon={<Moon className="h-8 w-8 text-primary" />}
              title="Dark Mode"
              description="Fully supported dark mode with smooth theme transitions and consistent color palettes."
              delay={0.8}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm py-8">
        <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 TechAuth. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </PageWrapper>
  )
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-colors duration-300">
        <CardHeader>
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
