import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email: string, otp: string, name: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"RetailSync AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your RetailSync AI Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <tr>
              <td style="padding: 40px 30px; background: linear-gradient(135deg, #00539F 0%, #003d75 100%); text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                  RetailSync AI
                </h1>
                <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0 0; font-size: 14px;">
                  Tesco Retail Media Platform
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 22px;">
                  Hello ${name}! 👋
                </h2>
                <p style="color: #666666; line-height: 1.6; margin: 0 0 30px 0;">
                  Your verification code for RetailSync AI is:
                </p>
                <div style="background: linear-gradient(135deg, #00539F 0%, #003d75 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 0 0 30px 0;">
                  <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #ffffff;">
                    ${otp}
                  </span>
                </div>
                <p style="color: #666666; line-height: 1.6; margin: 0 0 10px 0;">
                  ⏰ This code will expire in <strong>10 minutes</strong>.
                </p>
                <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 0;">
                  If you didn't request this code, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #999999; font-size: 12px; margin: 0;">
                  © 2025 RetailSync AI - Tesco Retail Media Hackathon
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}
