import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import adminRoute from "./src/routes/admin.routes.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import movieRouter from "./src/routes/movie.routes.js";
const app = express();


app.use(cookieParser());
app.use(cors({
    origin: [process.env.FONTEND_PORT],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
   
}));


app.use(express.json());
app.use(urlencoded({ extended: true }))

app.get("/", (req, res) => {
    console.log("hlo");
    res.send("front page");
});
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1/movies",movieRouter);

app.use(errorMiddleware)
export default app