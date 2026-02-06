import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandle.middleware.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import genrateToken from "../utils/jwtToken.js";


export const createUser = asyncHandler(async (req, res, next) => {

    let error = validationResult(req);

    if (!error.isEmpty()) {
        let errors = error.array().map(err => err.msg).join(", ")
        return next(new ErrorHandler(errors, 400))
    };

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please fill full details.", 400))
    }

    const { name, email, password, role = "user" } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill full form.", 400))
    };

    let user = await userModel.findOne({ email });

    if (user) {
        return next(new ErrorHandler(`${user.role} already registered with this email.`, 400))
    };

    if (req.body.role) {
        return next(new ErrorHandler("You are not allowed to assign any role!", 403));
    };

    let hashedPassword = await userModel.hashPassword(password);

    user = await userModel.create({
        name, email, password: hashedPassword, role
    });

    genrateToken(user, "user Create successfully", res, 200)

});

export const loginUser = asyncHandler(async (req, res, next) => {

    let error = validationResult(req);

    if (!error.isEmpty()) {
        let errors = error.array().map(err => err.msg).join(", ")
        return next(new ErrorHandler(errors, 400))
    };

    if (!req.body) {
        return next(new ErrorHandler("Please fill full details.", 400))
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please fill full form.", 400))
    };

    let user = await userModel.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400))
    };


    let isMatched = await user.comparePassword(password);

    if (!isMatched) {
        return next(new ErrorHandler("Invalid email or password.", 400))
    }

    if (user.role !== "user") {
        return next(new ErrorHandler("Access denied! Not an user.", 403))
    };
    genrateToken(user, "user logged in successfully", res, 200)

});

export const logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("userToken");
    return res.status(200).json({
        success: true,
        message: "user logged out successfully."
    });
})

export const createAdmin = asyncHandler(async (req, res, next) => {

    let error = validationResult(req);

    if (!error.isEmpty()) {
        let errors = error.array().map(err => err.msg).join(", ");
        return next(new ErrorHandler(errors, 400));
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please fill full form.", 400));
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill full form.", 400));
    }

    let loggedIn = await userModel.findOne({ email });

    if (loggedIn) {
        return next(new ErrorHandler(`${loggedIn.role} already registered with this email.`, 400));
    };

    if (!role) {
        return next(new ErrorHandler(`admin must be required to insert role`, 400));
    }

    if (!["user", 'admin'].includes(role)) {
        return next(new ErrorHandler("Invalid role! Admin must choose either 'user' or 'admin'.", 400))
    }

    let hashedPassword = await userModel.hashPassword(password);

    let user = await userModel.create({
        name, email, password: hashedPassword, role
    });

    if (role === "user") {
        genrateToken(user, "Admin created a User successfully.", res, 200);
    } else if (role === "admin") {
        genrateToken(user, "Admin created an Admin successfully.", res, 200);
    }

});

export const loginAdmin = asyncHandler(async (req, res, next) => {

    let error = validationResult(req);

    if (!error.isEmpty()) {
        let errors = error.array().map(err => err.msg).join(", ");
        return next(new ErrorHandler(errors, 400));
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please fill full form.", 400));
    };

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please fill full form.", 400));
    };

    let user = await userModel.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    let isMatched = await user.comparePassword(password);

    if (!isMatched) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    genrateToken(user, "admin logged in successfully.", res, 200)

});

export const logoutAdmin = asyncHandler(async (req, res, next) => {

    res.clearCookie("adminToken");

    return res.status(200).json({
        success: true,
        message: "user logged out successfully."
    });

});

export const getAdminProfile = async (req, res, next) => {

   return res.status(200).json({
        message : req.user
    })

};