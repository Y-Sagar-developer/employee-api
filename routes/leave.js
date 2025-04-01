import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js"
import { addLeave, getLeave, getLeaves, getLeavedetail, updateLeave } from "../controller/leaveController.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/detail/:id", authMiddleware, getLeavedetail);
router.get("/:id/:role", authMiddleware, getLeave);
router.get("/", authMiddleware, getLeaves);
router.put("/:id", authMiddleware, updateLeave);




export default router;

