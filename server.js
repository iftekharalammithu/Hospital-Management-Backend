import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import mongoDB_connection from "./Database/database_connection.js";
import Message_router from "./Router/Message_Router.js";
import User_Router from "./Router/User_Router.js";
import { v2 as cloudinary } from "cloudinary";
import appointment_router from "./Router/Appointment_Router.js";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 4000;

// FileUpload Configaration
// cloudinaryConfig.js

// Configaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Cors
app.use(
  cors({
    origin: [process.env.FONTEND_URL, process.env.ADMIN_DASHBOARD],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Routes
app.use("/api/v1/message", Message_router);
app.use("/api/v1/user", User_Router);
app.use("/api/v1/appintment", appointment_router);

//  Api

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  mongoDB_connection();
  console.log(`Example app listening on port ${port}`);
});
