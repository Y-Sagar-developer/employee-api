// import User from "./models/User.js";
// import bcrypt from "bcrypt";
// import connectTodatabase from "./db/db.js";

// const userRegister = async () => {
//   connectTodatabase();
//   try {
//     const hashPassword = await bcrypt.hash("admin", 10);
//     const newUser = new User({
//       name: "Admin",
//       email: "admin@gmail.com",
//       password: hashPassword,
//       role: "admin",
//     });
//     await newUser.save();
//     console.log("User registered successfully");
//   } catch (error) {
//     console.log(error);
//   }
// };

// userRegister();



import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
  await connectToDatabase(); // Ensure database is connected before proceeding

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: "admin@gmail.com" });

    if (existingUser) {
      console.log("⚠️ User already exists. Skipping registration.");
      return;
    }

    // Hash password before storing
    const hashPassword = await bcrypt.hash("admin", 10);

    // Create new user
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ User registered successfully!");
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    process.exit(1);
  }
};

// Run the function
userRegister();
