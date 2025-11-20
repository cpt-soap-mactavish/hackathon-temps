import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/db"
import User from "@/models/User"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          throw new Error("No user found with this email")
        }

        if (!user.password) {
             throw new Error("Please login with Google")
        }

        if (!user.isVerified) {
          throw new Error("Please verify your email first")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid password")
        }

        return { id: user._id, name: user.name, email: user.email }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await dbConnect()
        try {
          const existingUser = await User.findOne({ email: user.email })
          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              // No password for OAuth users
            })
          }
          return true
        } catch (error) {
          console.log("Error saving user", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id
        }
        return token
    },
    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id
        }
        return session
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
