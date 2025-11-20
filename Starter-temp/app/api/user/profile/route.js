import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).select('-password -verificationToken -resetToken');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { name, image, currentPassword, newPassword } = await req.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update basic info
    if (name) user.name = name;
    if (image !== undefined) user.image = image;

    // Update password if provided
    if (newPassword) {
      if (!user.password) {
         return NextResponse.json({ message: 'You are logged in with Google. You cannot set a password here.' }, { status: 400 });
      }

      if (!currentPassword) {
        return NextResponse.json({ message: 'Current password is required to set a new password' }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Incorrect current password' }, { status: 400 });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return NextResponse.json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email, image: user.image } }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
