const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

let changePassword = async (req, res) => {
  let { password, token } = req.body;
  //   console.log(password, token);

  bcrypt.hash(password, 10, async function (err, hash) {
    // Store hash in your password DB.
    try {
      let newpassword = hash;
      await User.findOneAndUpdate(
        { token: token },
        { $set: { password: newpassword, token: "" } },
        { strict: false }
      );
      res.status(200).send("Password Changed");
    } catch (err) {
      res.send(err);
    }
  });
};

module.exports = changePassword;
