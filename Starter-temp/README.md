# TechAuth - Modern Authentication System

A robust, secure, and modern authentication application built with **Next.js 15**, **Tailwind CSS**, and **MongoDB**.

![TechAuth Preview](https://via.placeholder.com/800x400?text=TechAuth+Preview) 
*(Replace with actual screenshot if available)*

## 🚀 Features

- **Authentication**:
  - 🔐 **Credentials Auth**: Secure Email/Password login with BCrypt hashing.
  - 🌐 **Google OAuth**: One-click login with Google.
  - 🛡️ **Session Management**: Protected routes and automatic redirects.
- **User Management**:
  - 👤 **Profile Page**: View and edit display name and profile image.
  - 🔑 **Password Management**: Secure password updates and "Forgot Password" flow via email.
  - ✅ **Email Verification**: Token-based email verification for new accounts.
- **UI/UX**:
  - 🎨 **Modern Design**: Glassmorphism aesthetic with Tailwind CSS.
  - 🌓 **Dark Mode**: Fully supported dark/light theme switching.
  - ✨ **Animations**: Smooth page transitions and micro-interactions using Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Auth**: [NextAuth.js v4](https://next-auth.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or Atlas URI)
- **Google Cloud Console Account** (for OAuth)
- **Gmail Account** (for sending emails)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables. You can use `.env.example` as a reference.

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/techauth

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Service (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-specific-password
```

> **Note**: For `GMAIL_APP_PASSWORD`, enable 2-Step Verification in your Google Account and generate an App Password.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 📂 Project Structure

```
├── app/                # Next.js App Router pages and API routes
│   ├── api/            # Backend API routes (auth, user, etc.)
│   ├── login/          # Login page
│   ├── register/       # Register page
│   ├── profile/        # User profile page
│   └── ...
├── components/         # Reusable UI components (Navbar, Buttons, etc.)
├── lib/                # Utility functions (DB connection, Mailer)
├── models/             # Mongoose database models
└── public/             # Static assets
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
