import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
