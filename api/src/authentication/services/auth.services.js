const encode = require("../../utils/jws.js").encode;
const User = require("../../user/model/user.model");

const registerUser = async (_user) => {
  const { username, email, password } = _user;
  const _old = await User.findOne({ email });
  if (_old) {
    throw new Error("User already exist");
  } else {
    const user = new User({ username, email, password });
    const _new = await user.save();
    return _new;
  }
};

const loginUser = async (_user) => {
  const { email, password } = _user;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = encode(user._id, user.email, user.role);
    return { user: await user.toJson(), token: token };
  } else throw Error("Invalid Credentials");
};

module.exports = { registerUser, loginUser };
