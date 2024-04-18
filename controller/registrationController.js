const User = require("../model/userSchema");
const emailvalidation = require("../helpers/emailValidation");

let registrationController = async (req, res) => {
  let { name, email, password } = req.body;

  let existingUser = await User.find({ email: email });
  //   console.log(existingUser);

  if (existingUser.length == 0) {
    if (!name) {
      res.send("Name Required");
    } else if (!password) {
      res.send("Password Required");
    } else if (!email) {
      res.send("Email Required");
    } else {
      if (email) {
        if (!emailvalidation(email)) {
          return res.send("A Valid Email Required");
        }
      }
      // saving a user into the database
      let user = new User({
        name,
        email,
        password,
      });

      user.save().then(() => {
        res.send("Registration succesfull !!");
      });
    }
  } else {
    res.send("User Already Existed !!");
  }
};

module.exports = registrationController;
