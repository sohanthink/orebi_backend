const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3r5mijt.mongodb.net/`;

async function DbConnection() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error connecting with mongodb database", error);
  }
}

module.exports = DbConnection;
