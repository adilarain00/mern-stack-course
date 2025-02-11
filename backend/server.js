import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";


dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)

mongoose.connect(process.env.MONGO).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

app.listen(5000, () => console.log("Server started on port 5000"));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({ 
        success: false,
        statusCode, 
        message
     });
});