const Admin = require("../models/admin.model");

async function createDefaultAdmin() {
  const existing = await Admin.findOne({ admin_email: "superadmin@example.com" });
  if (existing) return console.log("✅ Admin mặc định đã tồn tại");

  const newAdmin = new Admin({
    admin_name: "Super Admin",
    admin_email: "superadmin@example.com",
    admin_password: "123456", // plain text, sẽ được hash trong pre('save')
    admin_role: "superadmin",
    admin_permissions: [],
    admin_isBlocked: false,
  });

  await newAdmin.save(); // ✅ chạy pre-save để hash mật khẩu

  console.log("✅ Admin mặc định đã được tạo (email: superadmin@example.com, password: 123456)");
}
