import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { addDepartment, getDepartments,getDepartment,updateDepartement,deleteDepartement } from "../controller/departmentController.js";

const router = express.Router();

// GET request to fetch all departments
router.get("/", authMiddleware, getDepartments);

// POST request to add a new department
router.post("/", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, getDepartment); // Fetch a single department
router.put("/:id", authMiddleware, updateDepartement);
router.delete("/:id", authMiddleware, deleteDepartement);



export default router;

