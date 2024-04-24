const User = require("../model/userSchema");

let otpValidationController = async (req, res) => {
  let { email } = req.params;
  let user = await User.findOne({ email: email });

  console.log(user);

  // if (user) {
  //   if (user) {
  //     res.send({ varified: true, otp: user.otp });
  //   } else {
  //     res.send({ varified: false, otp: user.otp });
  //   }
  // } else {
  //   res.send("Invalid Link");
  // }

  if (user) {
    res.send({ varified: true, otp: user.otp });
  } else {
    res.send("Invalid Link");
  }
};

module.exports = otpValidationController;
