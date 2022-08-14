import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});
function sendSignUpOtp(message, toEmail) {
  let mailOptions = {
    from: process.env.USER_EMAIL, 
    to: toEmail, 
    subject: 'SignUp OPT Verfication',
    html: message, 
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}

function sendForgotPasswordOtp(message, toEmail) {
  let mailOptions = {
    from: process.env.USER_EMAIL, 
    to: toEmail, 
    subject: 'Forgot Password Verfication',
    html: message, 
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}
export { sendSignUpOtp,sendForgotPasswordOtp };
