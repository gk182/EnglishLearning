import cloudinary from "./configs/cloudinaryConfig.js";
import fs from "fs";

export const uploadImagesFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Upload thành công",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const updateImagesFile = async (req, res) => {
  try {
    const public_id = req.params.id;

    if (!public_id) {
      return res.status(400).json({ message: "Public ID is required in params." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No new image file uploaded." });
    }

    await cloudinary.uploader.destroy(public_id);

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Image updated successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const deleteImagesFile = async (req, res) => {
  try {
    const public_id = req.params.id;

    if (!public_id) {
      return res.status(400).json({ message: "Public ID is required in params." });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      return res.status(200).json({ message: "Image deleted successfully." });
    } else {
      return res.status(404).json({ message: "Image not found." });
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
