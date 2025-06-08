const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    admin_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin_role: {
      type: String,
      enum: ["superadmin", "staff"],
      default: "staff",
    },
    admin_permissions: {
      type: [String], // ví dụ: ['USER_MANAGE', 'PRODUCT_MANAGE']
      default: [],
    },
    admin_isBlocked: {
      type: Boolean,
      default: false,
    },
    admin_passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password trước khi lưu
adminSchema.pre("save", async function (next) {
  if (!this.isModified("admin_password")) return next();
  this.admin_password = await bcrypt.hash(this.admin_password, 10);
  next();
});

// So sánh mật khẩu khi đăng nhập
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.admin_password);
};

module.exports = mongoose.model("Admin", adminSchema);
