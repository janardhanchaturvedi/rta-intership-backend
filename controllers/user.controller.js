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

const getUser = (req, res) => {
  const user = User.find();
  return res.json({
    data: user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({
      email: email,
    });

    if (!users) {
      return res.json({
        message: "User not registered Please SignUp",
      });
    }

    if (users.password === password) {
      return res.json({
        message: "User Logged In Successfully",
      });
    }
    console.log("users", users);
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: "Something went wrong",
    });
  }
  return res.json({
    message: "ok",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
