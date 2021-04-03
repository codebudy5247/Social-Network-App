import express from "express";
import path from "path";
import { fileURLToPath } from "url";


import logger from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

var app = express();

dotenv.config();

//Connect to DB
connectDB();

// view engine setup

// app.engine(".hbs", exphbs({ defaultLayout: "layout", extname: ".hbs" }));
// app.set("view engine", ".hbs");


app.use(logger("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



//Import Routes

import userRouter from "./routes/userRoutes.js";

app.use("/api/users", userRouter);

// static public files
//app.use(express.static("public"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.get("/", (req, res) => {
    res.send("API is running....");
});


app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);
