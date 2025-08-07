const nodemailer=require('nodemailer');
const createTransporter=require('./transporter');
const sendOtp = async (email, otp) => {
  const  transporter = await  createTransporter();

  const mailOptions = {
    from: '"Sarim App " <ashrafsarim96@gmail.com>',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('OTP Sent to ', email);
};

module.exports = sendOtp;