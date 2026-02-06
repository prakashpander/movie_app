import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./src/config/db.js";
import app from "./app.js"

const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
    console.log(`server run on port http://localhost:${port}`);
});