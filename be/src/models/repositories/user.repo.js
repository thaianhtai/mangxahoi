const { convertToObjectIdMongodb } = require('../../utils');
const User = require('../../models/user.model');

const findUserByEmail = async (email) => {
    return await User.findOne({ user_email: email }).select('-user_password').lean();
};
const findUserById = async (id) => {
    return await User.findById(convertToObjectIdMongodb(id)).lean();
};

const updateUserById = async (id, payload) => {
    return await User.findByIdAndUpdate(id, payload, { new: isNew });
};
module.exports = { findUserByEmail, findUserById, updateUserById };
