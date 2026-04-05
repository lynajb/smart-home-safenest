const User = require("../model/user.model");

const getAllUsers = async () => {
  const others = await User.find().exec();
  if (!others) {
    throw Error("There is no one else except you");
  }

  return others;
};

const getOtherUsers = async (userId) => {
  const others = await User.find({ _id: { $ne: userId } }).select({
    _id: 1,
    displayName: 1,
    username: 1,
    email: 1,
    avatar: 1,
    role: 1,
    dateOfBirth: 1,
    isActive: 1,
  });

  if (!others) {
    throw Error("There is no one else except you");
  }

  return others;
};

const addUser = async (_user) => {
  const { username, email, password, role, dateOfBirth } = _user;
  const _old = await User.findOne({ email });
  if (_old) {
    throw new Error("User already exist");
  } else {
    const user = new User({ username, email, password, role, dateOfBirth });
    const _new = await user.save();
    return _new;
  }
};

module.exports = {
  getAllUsers,
  getOtherUsers,
  addUser,
};