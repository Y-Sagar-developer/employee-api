import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { addSalary,getSalary } from "../controller/salaryController.js";

const router = express.Router();

router.post("/add", authMiddleware, addSalary);
router.get("/:id/:role", authMiddleware, getSalary);





export default router;

