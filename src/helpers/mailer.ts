import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const base64EncodedToken = Buffer.from(hashedToken).toString("base64");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: base64EncodedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: base64EncodedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "kaflerams34@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail?token=" : "forgetpassword/"
      }${base64EncodedToken}"> Here </a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password</p>"
      } `,
    };

    const mailRespoonse = await transport.sendMail(mailOptions);
    return mailRespoonse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
