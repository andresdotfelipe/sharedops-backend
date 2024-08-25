const mongoose = require("mongoose");
const { dbConfig } = require("./config");

const connectDB = () => {
  const { mongodb_uri } = dbConfig;

  mongoose
    .connect(mongodb_uri)
    .then(() => console.log("Connected to DB"))
    .catch((error) => {
      console.log("DB connection error:", error);
    });
};

connectDB();
