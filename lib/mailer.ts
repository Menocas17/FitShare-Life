import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(to: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetLink = `${appUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: "Reset Your Password",
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password (expires in 15 minutes):</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
}

export async function sendPasswordChangeConfirmation(to: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: "Your Password Has Been Changed",
    html: `
      <h2>Password Changed Successfully</h2>
      <p>This is to confirm that your password was changed. If you didn’t make this change, please reset your password immediately.</p>
    `,
  });
}
