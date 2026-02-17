const { User } = require("./../models/user.model");

const registerUser = async (req, res) => {
  const { fullName, email, password } = req?.body;
  const response = await User.create({
    fullName,
    email,
    password,
  });
  return res.json({
    message: "User Created succefully",
  });
};

module.exports = {
  registerUser,
};
