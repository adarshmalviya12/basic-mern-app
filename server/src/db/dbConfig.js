const mongoose = require("mongoose");
const DB_NAME = require("../constants");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Error connecting to Mongo ", error.message);
    process.exit(0);
  }
};

module.exports = connectDB;
