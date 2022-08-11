import nodemailer from "nodemailer";

function sendSignUpOtp(message, toEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.USER_EMAIL, // sender address
    to: toEmail, // list of receivers
    subject: "SignUp OPT Verfication", // Subject line
    html: message, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}
export { sendSignUpOtp};
