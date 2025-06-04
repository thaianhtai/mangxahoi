const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Tự động kết nối MongoDB khi require
require("./dbs/init.mongodb");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🎉 Server is running and connected to MongoDB!");
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
