import otpGenerator from 'otp-generator';
export const AddMinutesToDate = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};
export const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
export const generateDate = () => {
  return new Date();
};

export const LoginOtpMessage = (OTP) => {
  return `
    <div
      class="container"
      style="max-width: 90%; margin: auto; padding-top: 20px"
    >
      <h2>Welcome to the club.</h2>
      <h4>You are officially In ✔</h4>
      <p style="margin-bottom: 30px;">Please enter  OTP to verify and  get started</p>
      <h1 style="font-size: 40px; letter-spacing: 4px; text-align:center;">${OTP}</h1>
 </div>
  `;
};
export const sendForgotPasswordMessage = (url) => {
  return `
    <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the COMPANY Z.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please click on this link to reset your password.</p>
        <h1 style="font-size: 40px; letter-spacing: 4px; text-align:center;"><a href="${url}">Reset Password</></h1>
  </div>
    `;
};
export const NotificationLogin=(url)=>{
  return `
    <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the COMPANY Z.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please click on this link to login.</p>
        <h1 style="font-size: 40px; letter-spacing: 4px; text-align:center;"><a href="${url}">Login</></h1>
  </div>
    `;
}

export const verifyDate = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === 'object'
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};
