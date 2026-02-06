import express from "express";
import { addNewMovie, deleteMovie, searchMovie, sortMovie, updateMovie, viewMovies } from "../controllers/movie.controller.js";
import { authAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// --------------  Movies routes  --------------------

router.get("/getall/movies", viewMovies);

router.get("/search", searchMovie); // keyword=value

router.get("/sort", sortMovie); //by = value

router.post("/addmovie", upload.single("file"), authAdmin, addNewMovie);

router.put("/updatemovie/:id", upload.single("file"), authAdmin, updateMovie);

router.delete("/deletemovie/:id", authAdmin, deleteMovie);

export default router;


