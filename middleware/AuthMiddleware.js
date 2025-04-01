import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    // Check if the token exists
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, "sagarsecretkey");

    // Find user from token
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Call the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export default verifyUser;


