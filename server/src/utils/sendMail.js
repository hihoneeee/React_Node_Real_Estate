import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendMail = asyncHandler(async (data) => {
  const { email, html } = data;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP_GMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Test Email Huy Ho" <no-relply@testemail.com>',
    to: email,
    subject: "Forgot Password!",
    html: html,
  });
  return info;
});
