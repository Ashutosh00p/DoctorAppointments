const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
exports.register = async (req, res) => {
 try {
 const { name, email, password, role, phone } = req.body;
 if (!name || !email || !password) return res.status(400).json({ success: false, message: "Please provide all required fields" });

 const userExists = await User.findOne({ email });
 if (userExists) return res.status(400).json({ success: false, message: "Email already registered" });

 const user = await User.create({ name, email, password, role, phone });
 const token = generateToken(user._id);

 res.status(201).json({
 success: true,
 message: "User registered successfully",
 token,
 user: {
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
}
 });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.login = async (req, res) => {
    try {
 const { email, password } = req.body;
 if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });

 const user = await User.findOne({ email }).select("+password");
 if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

 const isMatch = await user.matchPassword(password);
 if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

 const token = generateToken(user._id);
 res.status(200).json({
 success: true,
 message: "Login successful",
 token,
 user: {
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
}
 });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.getProfile = async (req, res) => {
 try {
 const user = await User.findById(req.userId);
 if (!user) return res.status(404).json({ success: false, message: "User not found" });
 res.status(200).json({ success: true, user });
 } catch (error) {
 res.status(500).json({ success: false, message: error.message });
 }
};
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, profileImage } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};