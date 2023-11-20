const { where } = require("sequelize");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function hashedPassword(password) {
  return await bcrypt.hashSync(password, 10);
}

async function validatepassword(plainpassword, hashedPassword) {
  return await bcrypt.compare(plainpassword, hashedPassword);
}

const registerUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password } = req.body;
    password = await hashedPassword(password);

    let registerUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    const isMailExist = await User.findOne({ email });
    if (isMailExist) {
      return res.json({ msg: "This email is already registered!" });
    }

    await User.create(registerUser);

    if (!registerUser) {
      return res.status(400).json({
        msg: "User registraton failed!",
      });
    } else {
      return res.status(200).json({
        msg: "Registeration Successful!",
        data: registerUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });
    console.log("------userEmail------", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    // Validate the password
    const isPasswordValid = await validatepassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    return res.status(200).json({
      msg: "Login successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
