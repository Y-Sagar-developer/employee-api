// import mongoose from "mongoose";

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/ems", {
//       serverSelectionTimeoutMS: 5000, // Prevents long wait times
//     });
//     console.log("✅ MongoDB connected successfully!");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//   }
// };

// export default connectToDatabase;



import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Get MongoDB URI from environment variables
    if (!mongoURI) throw new Error("MONGODB_URI is missing in environment variables");

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
