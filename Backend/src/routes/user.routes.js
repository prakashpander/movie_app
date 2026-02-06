import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// --------------  user routes  --------------------
router.post("/createuser",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("name").isLength({ min: 3 }).withMessage("name must be at least 3 characters long"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ], createUser);

router.post("/loginuser",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ], loginUser);

router.get("/logoutuser", authUser, logoutUser);


export default router;