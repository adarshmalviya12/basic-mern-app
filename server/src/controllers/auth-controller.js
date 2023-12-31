const User = require("../models/User.model.js");

const home = async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newUser = new User({
      username,
      phone,
      email,
      password,
    });

    await newUser.save();

    const token = await newUser.createJWT();

    res.status(201).json({
      message: "User Created Successfully",
      data: {
        userId: newUser._id,
        username: newUser.username,
        phone: newUser.phone,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = await existingUser.createJWT();

    const isMatch = await existingUser.comparePassword(password);

    if (isMatch) {
      res.status(200).json({
        message: "User Logged In Successfully",
        data: {
          userId: existingUser._id,
          username: existingUser.username,
          phone: existingUser.phone,
          email: existingUser.email,
        },
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home, register, login };
