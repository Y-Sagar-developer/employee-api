import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { addEmployee, upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesById } from "../controller/employeeController.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);

router.post("/add",authMiddleware, upload.single("image"), addEmployee);

router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesById);


export default router;
