require("dotenv").config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const express = require("express");
const mongoose = require("mongoose");

const app = require("./app.js");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
