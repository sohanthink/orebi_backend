const User = require("../model/userSchema");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let forgotPasswordController = async (req, res) => {
  let { email } = req.body;
  //   console.log(email);
  let existingUser = await User.findOne({ email: email });
  //   console.log(existingUser.email);

  if (!existingUser) {
    res.status(404).send("No User Found Associated With This Email");
  } else {
    // let converttotoken = existingUser.email;
    // console.log(converttotoken);
    // make the mail into token
    jwt.sign(
      { email: existingUser.email },
      "sohansaome",
      async function (err, token) {
        // console.log(token);
        //   console.log(err);
        await User.updateOne(
          { email: email },
          { $set: { token: token } },
          { strict: false }
        );

        let link = `${process.env.WEBSITE_URI}/changepassword/${token}`;
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.BASE_EMAIL,
            pass: process.env.EMAIL_KEY,
          },
        });

        await transporter.sendMail({
          from: process.env.BASE_EMAIL,
          to: existingUser.email,
          subject: "Change Password",
          html: `
                      <p>Dear User,</p>
                      <p>Thank you for signing up with OREBI! To Change your Password. Please use this link.</p>
                      
                      <p style="padding:20px 0;background:yellow;text-align:center">${link}</p>
                      
                      <p>Once your Password had changed, Then you can use our services.</p>
                      <p>If you did not sign up for an account with OREBI, please disregard this email.</p>
                      <p>Thank you,<br/>The OREBI Team</p>
                  `,
        });
      }
    );
    res.send("A Link is submitted to your mail to reset your password");
  }
};

module.exports = forgotPasswordController;
