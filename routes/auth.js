import express from "express";
import { login, verify } from "../controller/authController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);

// ✅ Change POST to GET for verification
router.get("/verify", authMiddleware, verify);

export default router;
