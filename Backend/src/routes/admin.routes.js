import express from "express";
import { createAdmin, getAdminProfile, loginAdmin, logoutAdmin } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { authAdmin} from "../middleware/auth.middleware.js";

const router = express.Router();

         // --------------  admin routes  --------------------

router.post("/createadmin",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("name").isLength({ min: 3 }).withMessage("name must be at least 3 characters long"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    createAdmin);


router.post("/loginadmin",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    ], loginAdmin);

router.get("/logoutadmin", authAdmin, logoutAdmin);

router.get("/profile", authAdmin, getAdminProfile);

export default router