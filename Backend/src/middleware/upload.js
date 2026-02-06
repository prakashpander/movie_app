import cloudinary from "../config/cloudinary.js"
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";

let storage = new CloudinaryStorage({
    cloudinary,
    params : {
        floder : "movie",
        allowed_formats :["jpg","png","jpeg","webp"]
    }
});

let upload = multer({storage});

export default upload;