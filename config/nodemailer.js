import nodemailer from "nodemailer";

// const email = process.env.EMAIL;
// const pass = process.env.EMAIL_PASS;
const email = "rohitsivasai989@gmail.com";
const pass = "cfaaztwkljmdkijy";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: "rohitsivasai989@gmail.com",
  to: "rohitsivasaireddy@gmail.com",
};