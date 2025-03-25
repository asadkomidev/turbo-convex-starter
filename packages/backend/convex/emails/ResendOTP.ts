import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import { getVerificationEmailTemplate } from "./templates/verification";

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 15,
  async generateVerificationToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const currentYear = new Date().getFullYear();
    
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Your Verification Code",
      html: getVerificationEmailTemplate(token, currentYear),
    });

    if (error) {
      throw new Error(JSON.stringify(error.message));
    }
  },
});
