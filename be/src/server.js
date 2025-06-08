require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Admin = require("./models/admin.model"); // <-- Thêm dòng này
const bcrypt = require("bcrypt"); // <-- Thêm dòng này nếu cần

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
require("./dbs/init.mongodb");

// Khởi tạo admin mặc định nếu chưa có
async function createDefaultAdmin() {
  const existing = await Admin.findOne({ admin_email: "superadmin@example.com" });
  if (!existing) {
    const newAdmin = await Admin.create({
      admin_name: "Super Admin",
      admin_email: "superadmin@example.com",
      admin_password: "123456", // để nguyên, schema sẽ tự hash
      admin_role: "superadmin",
      admin_permissions: [],
      admin_isBlocked: false,
    });
    console.log("✅ Admin mặc định đã được tạo (email: superadmin@example.com, password: 123456)");
    console.log("Password hash trong DB:", newAdmin.admin_password);
  } else {
    console.log("ℹ️ Admin mặc định đã tồn tại");
  }
}
createDefaultAdmin(); // <-- Gọi hàm

// Route nội bộ
const routes = require("./routes");
app.use("/api/v1", routes);

// Test route
app.get("/", (req, res) => {
  res.send("🎉 Server is running and connected to MongoDB!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
