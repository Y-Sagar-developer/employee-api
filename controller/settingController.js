// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// const changePassword = async (req, res) => {
//   try {
//     const { userId, oldPassword, newPassword } = req.body;
//     const user = await User.findById({ _id: userId });
//     if (!user) {
//       return res.status(404).json({ success: false, error: "use not found" });
//     }
//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res
//         .status(404)
//         .json({ success: false, error: "wront old password" });
//     }
//     const hashPassword = await bcrypt.hash(newPassword, 10);
//     const newUser = await User.findByIdAndUpdate(
//       { _id: userId },
//       { password: hashPassword }
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: "setting error" });
//   }
// };
// export { changePassword };

import User from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    console.log("Request received:", req.body); // Debugging log

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    console.log("User found:", user); // Debugging log

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Wrong old password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const newUser = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { changePassword };
