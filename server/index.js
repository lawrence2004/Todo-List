import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { todoRouter } from "./routes/TodoRouter.js";
import cors from "cors";

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }
    catch(err) {
        console.log("Error : ", err.message);
    }
}

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.use("/todo", todoRouter);

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})
