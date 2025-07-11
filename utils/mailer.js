const nodemailer = require("nodemailer");

const sendMail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mansirakholiya570@gmail.com",        
      pass: "gtkqrubwtgplrwsa", 
    },
  });

  const mailOptions = {
    from: "mansirakholiya570@gmail.com",
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
