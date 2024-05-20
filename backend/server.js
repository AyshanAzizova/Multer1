import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import UserRoute from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
// app.use("/api/auth",UserRoute);

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;


const storage = multer.diskStorage({
    destination: function (request,file,cb) {
        cb(null,"./Images")
    },
    fileName: function (request,file,cb) {
        cb(null, Date.now() + "-" + file.originalName)
    },
});

const upload = multer({storage:storage})

app.use("/api/auth", upload.single("profilePic"),UserRoute);



mongoose
  .connect(MONGODB_URL)
  .then(
    app.listen(PORT, () => {
      console.log(
        `MongoDB is connected and server is listening on Port:${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(error);
  });
