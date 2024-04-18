const mongoose = require("mongoose");
const { schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Merchant", "User"],
      default: "User",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
