import mongoose from "mongoose";

export const connectDB = () => {

    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        .then(() => {
            console.log("database connected successfully...");
        })
        .catch((error) => {
            console.error("Database connection failed:", error.message);
            process.exit(1);
        });
}
