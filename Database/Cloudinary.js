// Cloudinary.js
import cloudinary from "cloudinary";

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDANARY_NAME,
  api_key: process.env.CLOUDANARY_API_KEY,
  api_secret: process.env.CLOUDANARY_SECKET_KEY,
});

export default cloudinary;
