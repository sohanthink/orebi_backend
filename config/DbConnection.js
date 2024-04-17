const mongoose = require("mongoose");

const uri =
  "mongodb+srv://orebi_backend:zWzJpY.5Zb.LjEH@cluster0.3r5mijt.mongodb.net/";

async function DbConnection() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error connecting with mongodb database", error);
  }
}

module.exports = DbConnection;
