const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPass });
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "invalid credentials" });

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
