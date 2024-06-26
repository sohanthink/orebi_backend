const User = require("../model/userSchema");
const emailValidation = require("../helpers/emailValidation");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, otp, verificationLink) => {
  // Create a Nodemailer transporter using SMTP
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.BASE_EMAIL,
      pass: process.env.EMAIL_KEY,
    },
  });

  // Email template
  let mailOptions = {
    from: process.env.BASE_EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `
            <p>Dear User,</p>
            <p>Thank you for signing up with OREBI! To complete your registration and ensure the security of your account, please verify your email address by Using the OTP</p>
            
            <p style="padding:20px 0;background:yellow;text-align:center">${otp}</p>
            <p>you can visit the link to verify as well : ${verificationLink}</p>
            <p>Once your email address has been verified, you will have full access to our services.</p>
            <p>If you did not sign up for an account with OREBI, please disregard this email.</p>
            <p>Thank you,<br/>The OREBI Team</p>
        `,
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

let registrationController = async (req, res) => {
  let { name, email, password, role, verify } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    if (!name || !password || !email) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Hash the password
    let hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      verify,
      otp: otp,
    });

    await user.save();

    // Send verification email
    let verificationLink = `${process.env.WEBSITE_URI}/otp/${email}`;
    await sendVerificationEmail(email, otp, verificationLink);

    res
      .status(200)
      .json({ message: "Verification code sent to your email !!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

module.exports = registrationController;
