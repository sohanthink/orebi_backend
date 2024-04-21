const User = require("../model/userSchema");

let otpValidationController = async (req, res) => {
  let { email } = req.params;
  let user = await User.findOne({ email: email });

  if (user) {
    res.send({ varified: true, otp: user.otp });
  } else {
    res.send({ varified: false, otp: user.otp });
  }
};

module.exports = otpValidationController;
