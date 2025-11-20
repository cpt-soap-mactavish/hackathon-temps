import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/mail';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if the user exists
      return NextResponse.json({ message: 'If an account exists with this email, a reset link has been sent.' }, { status: 200 });
    }

    // If user registered with Google (no password), they can't reset it here
    if (!user.password) {
         return NextResponse.json({ message: 'This account uses Google Login. Please sign in with Google.' }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: 'If an account exists with this email, a reset link has been sent.' }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
