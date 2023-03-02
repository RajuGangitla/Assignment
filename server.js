import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import connectDb from "./db/connect.js";
import patientRoutes from "./routes/patientRoutes.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));

//db connection
mongoose.set("strictQuery", true);
connectDb();

//middleware
app.use(express.json());
app.use("/api/v1/patients", patientRoutes);

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on ${port}`));
