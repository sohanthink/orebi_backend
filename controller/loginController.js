const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  let { email, password } = req.body;
  // console.log(email, password);

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(401).send("User not found");
  } else if (existingUser.length === 0) {
    res.status(401).send("Invalid credentials");
  } else {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      // result == true
      if (result) {
        res.status(200).send("Successfully logged in");
      } else {
        res.status(401).send("Invalid credentials");
      }
    });
  }
};

module.exports = loginController;
