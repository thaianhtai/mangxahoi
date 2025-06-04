const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    user_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    user_avatar_url: {
      type: String,
      default: "https://default-avatar-url.com/avatar.png",
    },
    user_cover_url: {
      type: String,
      default: "",
    },
    user_bio: {
      type: String,
      maxlength: 200,
      default: "",
    },
    user_gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    user_birthday: {
      type: Date,
    },
    user_phone: {
      type: String,
    },
    user_address: {
      type: String,
    },
    user_friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user_following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user_followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user_isBlocked: {
      type: Boolean,
      default: false,
    },
    user_passwordChangedAt: Date,
  },
  {
    timestamps: true, // tự động tạo createdAt và updatedAt
  }
);

// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("user_password")) return next();
  this.user_password = await bcrypt.hash(this.user_password, 10);
  next();
});

// So sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.user_password);
};

module.exports = mongoose.model("User", userSchema);
