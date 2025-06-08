// src/routes/index.js
"use strict";

const express = require("express");
const userRouter = require("./user.route");
const AuthUser = require("./auth/userAuth");
const AuthAdmin = require("./auth/adminAuth.route");
const AdminRouter = require("./admin.route");
const router = express.Router();

router.use("/users", userRouter);

router.use('/admins',AdminRouter);
router.use('/auth/user',AuthUser);
router.use('/auth/admin',AuthAdmin);

module.exports = router;
