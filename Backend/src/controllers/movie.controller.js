import movieModel from "../models/movie.model.js";
import asyncHandler from "../utils/asyncHandle.middleware.js";
import ErrorHandler from "../utils/errorHandler.utils.js";
import cloudinary from "../config/cloudinary.js";

export const viewMovies = asyncHandler(async (req, res, next) => {

    const movie = await movieModel.find();

    return res.status(200).json({
        success: true,
        movie
    });

});

export const searchMovie = asyncHandler(async (req, res, next) => {
    let { keyword } = req.query;

    if (!keyword) {
        return res.status(200).json({
            success: true,
            message: "Movie not found.",
            movies: []
        });
    }

    let movies = await movieModel.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { descriti: { $regex: keyword, $options: 'i' } }
        ]
    });

    if (movies.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Movie not found",
            movies: []
        });
    }

    return res.status(200).json({
        success: true,
        count: movies.length,
        movies: movies || []
    })

});

export const sortMovie = asyncHandler(async (req, res, next) => {

    let { by } = req.query;

    let sortOption = {};

    if (by === "release") {
        sortOption = { releaseDate: -1 }
    }
    else if (by === "rating") {
        sortOption = { rating: -1 }
    }
    else if (by === "latest") {
        sortOption = { createdAt: -1 }
    }
    else if (by === "runtime") {
        sortOption = { duration: 1 }
    }
    let movies = [];

    if (by === "all") {
        movies = await movieModel.find();
    }
    else {
        movies = await movieModel.find().sort(sortOption);
    }

    return res.status(200).json({
        success: true,
        count: movies.length,
        movies
    })

});

export const addNewMovie = asyncHandler(async (req, res, next) => {

    if (!req.file) {
        return next(new ErrorHandler("Movie image required.", 400))
    };

    let { name, description, rating, releaseDate, duration } = req.body;

    if (!name || !description || !rating || !releaseDate || !duration) {
        return next(new ErrorHandler("Please fill all details.", 400));
    }

    let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movie"
    })

    let Movie = await movieModel.create({
        name, description, rating: Number(rating), releaseDate: new Date(releaseDate), duration: Number(duration),
        image: {
            url: result.secure_url,
            public_id: result.public_id
        }
    });

    return res.status(200).json({
        success: true,
        message: "Movie created successfully",
        Movie
    })


});

export const updateMovie = asyncHandler(async (req, res, next) => {

    let { id } = req.params

    if (Object.keys(req.body).length === 0 && !req.file) {
        return next(
            new ErrorHandler("At least one field is required to update the movie.", 400)
        );
    }

    let movie = await movieModel.findById(id);

    if (!movie) {
        return next(new ErrorHandler("Movie not found", 404))
    }

    let updateData = {
        ...req.body
    };

    if (req.file) {
        if (movie.image?.public_id) {
            await cloudinary.uploader.destroy(movie.image.public_id)
        }

        let result = await cloudinary.uploader.upload(req.file.path);

        updateData.image = {
            url: result.secure_url,
            public_id: result.public_id
        }

    }

    let updateMovie = await movieModel.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: false });

    return res.status(200).json({
        success: true,
        message: "movie updated",
        updateMovie
    })


});

export const deleteMovie = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    let movie = await movieModel.findByIdAndDelete(id)
    if (!movie) {
        return next(new ErrorHandler("Movie not found.", 404));
    }
    return res.status(200).json({
        success: true,
        message: "Movie deleted successfully."
    })

})











// export const updateMovie = asyncHandler(async (req, res, next) => {

//   const { id } = req.params;
//   let updateData = {};

//   // 1️⃣ Build updateData with type conversion
//   Object.keys(req.body).forEach((key) => {
//     let value = req.body[key];

//     if (
//       value === "" ||
//       value === null ||
//       value === "null"
//     ) return;

//     // 🔁 Type conversion
//     if (key === "rating" || key === "duration") {
//       value = Number(value);
//       if (isNaN(value)) return;
//     }

//     if (key === "releaseDate") {
//       value = new Date(value);
//       if (isNaN(value.getTime())) return;
//     }

//     updateData[key] = value;
//   });

//   // 2️⃣ Image handling
//   if (req.file) {
//     const movie = await movieModel.findById(id);
//     if (!movie) {
//       return next(new ErrorHandler("Movie not found", 404));
//     }

//     if (movie.image?.public_id) {
//       await cloudinary.uploader.destroy(movie.image.public_id);
//     }

//     const result = await cloudinary.uploader.upload(req.file.path);

//     updateData.image = {
//       url: result.secure_url,
//       public_id: result.public_id
//     };
//   }

//   // 3️⃣ Empty update check (MOST IMPORTANT)
//   if (Object.keys(updateData).length === 0) {
//     return next(
//       new ErrorHandler("No valid fields provided for update.", 400)
//     );
//   }

//   // 4️⃣ Update
//   const updatedMovie = await movieModel.findByIdAndUpdate(
//     id,
//     { $set: updateData },
//     { new: true, runValidators: false }
//   );

//   if (!updatedMovie) {
//     return next(new ErrorHandler("Movie not found", 404));
//   }

//   return res.status(200).json({
//     success: true,
//     message: "Movie updated successfully",
//     updatedMovie
//   });
// });
