import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from  "cors";
import * as dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

dotenv.config()

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes)

const CONNECTION_URL = process.env.ATLAS_URL;
const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//     .catch((error) => console.log(`${error} did not connect`));

const start = async () => {
    try {
        await mongoose.connect(CONNECTION_URL)
        app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
};

start();