// import { v2 as cloudinary } from "cloudinary";

// export const imagetoUrl = async (file: Base64URLString): Promise<string> => {
//     try {
//         const result = await cloudinary.uploader.upload(file);
//         return result.secure_url;
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         throw error;
//     }
// };

// export const cloudinaryConfig = () => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });
// }