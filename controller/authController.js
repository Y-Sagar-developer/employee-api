import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong password" });
    }

    // Generate token
    const token = jwt.sign(
      { _id: user._id, role: user.role }, // ✅ Make sure role is in token
      "sagarsecretkey",
      { expiresIn: "10d" }
    );

    // Send success response
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role, // ✅ Ensure role is sent in response
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
const verify=(req,res)=>{
  return res.status(200).json({success:true, user:req.user})
}
export { login, verify };
