import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: "kaflerams34@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}"> Here </a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password</p>"
      } `,
    };

    const mailRespoonse = await transport.sendMail(mailOptions);
    return mailRespoonse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
