import nodemailer from "nodemailer";
import "dotenv/config";
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_SERVER as string,
  port: parseInt(process.env.BREVO_SMTP_PORT as string),
  auth: {
    user: process.env.BREVO_SMTP_USER as string,
    pass: process.env.BREVO_SMTP_PASS as string,
  },
});

const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SENDER_EMAIL}" <${process.env.SENDER_EMAIL}>`, // sender address
      to, // list of recipients
      subject, // subject line
      html: body, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};

export default sendEmail;
