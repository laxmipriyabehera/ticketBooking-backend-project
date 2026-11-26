import express from "express";
import { registerUser, loginUser, registerCustomer } from "../controllers/authController.js";

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// Customer Registration
router.post("/register-customer", registerCustomer);

// User Login
router.post("/login", loginUser);

export default router;