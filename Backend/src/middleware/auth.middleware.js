import asyncHandler from "../utils/asyncHandle.middleware.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authUser = asyncHandler(async (req, res, next) => {
   try {

     let token = req.cookies.userToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new ErrorHandler("Unauthorized", 401));
    }

    let decode = await jwt.verify(token, process.env.JWT_SECRET);

    let user = await userModel.findById(decode._id);

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    req.user = user
    next()
    
   } catch (error) {

    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError"
    ) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }

    return next(new ErrorHandler("Authentication failed", 500));
    
   }

});

export const authAdmin = asyncHandler(async (req, res, next) => {

   try {

     let token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return next(new ErrorHandler("Unauthorized admin",401));
    };

    let decode = await jwt.verify(token , process.env.JWT_SECRET);

    let user = await userModel.findById(decode._id);

    if (!user || user.role !== "admin") {
        return next(new ErrorHandler("Admin access denied", 403))
    }

    req.user = user;

    next();
    
   } catch (err) {

    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError"
    ) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }

    return next(new ErrorHandler("Admin authentication failed", 500));
    
   }

});