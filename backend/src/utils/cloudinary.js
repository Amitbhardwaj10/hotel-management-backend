import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError.js";

cloudinary.config({
	cloudinary_url: process.env.CLOUDINARY_URL,
});

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
	try {
		if (!localFilePath) return null;

		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: resourceType,
		});

		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
		return response;
	} catch (error) {
		console.log("Cloudinary Error:", error.message || error);

		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
		return null;
	}
};

const removeFromCloudinary = async (publicId) => {
	if (!publicId) throw new ApiError(400, "Public ID is required");

	return await cloudinary.uploader.destroy(publicId);
};

export { uploadOnCloudinary, removeFromCloudinary };
