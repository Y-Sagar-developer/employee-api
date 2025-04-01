
// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";

// import cors from "cors";
// import authRouter from "./routes/auth.js";
// import departmentRouter from "./routes/department.js";
// import employeeRouter from "./routes/employee.js";
// import salaryRouter from "./routes/salary.js"
// import connectTodatabase from "./db/db.js";
// import leaveRouter from "./routes/leave.js"
// import settingRouter from "./routes/setting.js"
// import dashboardRouter from "./routes/dashboard.js"
// import dotenv from "dotenv";
// dotenv.config();
// const PORT = process.env.PORT || 5000;

// connectTodatabase();
// const app = express();
// app.use(cors());
// // app.use(cors({
// //   origin:"https://employee-frontend-ebon.vercel.app",
// //   credentials:true
// // }))
// app.use(express.json());
// app.use(express.static("public/uploads"))
// app.use("/api/auth", authRouter);
// app.use("/api/department", departmentRouter);
// app.use("/api/employee", employeeRouter);
// app.use("/api/salary",salaryRouter)
// app.use("/api/leave",leaveRouter)
// app.use("/api/setting",settingRouter)
// app.use("/api/dashboard",dashboardRouter)


// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectTodatabase from "./db/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";

const PORT = process.env.PORT || 5000;

// Connect to Database
connectTodatabase();

const app = express();

// CORS Configuration
// app.use(cors({
//   origin: process.env.CLIENT_URL || "https://employee-frontend-ebon.vercel.app",
//   credentials: true,
// }));
app.use(cors({
  origin: "		   https://employee-frontend-sand-two.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(express.static("public/uploads"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
