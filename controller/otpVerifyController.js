const User = require("../model/userSchema");

let otpVerifyController = async (req, res) => {
  let { email, otp } = req.body;
  let user = await User.findOne({ email: email });

  if (user.otp == otp) {
    await User.findOneAndUpdate({ email: email }, { otp: "", verify: "true" })
      .then(() => {
        res.send("verify Successfully");
      })
      .catch((error) => {
        res.send("verify failed! Please Try again");
      });
  }

  if (user.otp == "") {
    res.status(400).send("Already Verified");
  }
};

module.exports = otpVerifyController;
