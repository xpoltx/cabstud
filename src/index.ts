import express from "express";

import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/router";

const app = express();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connected successfully");
});
mongoose.connection.on('eror', (error: Error) => console.log(error));

app.listen(3000, () => {
    console.log("server running");
});