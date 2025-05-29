import cloudinary from "./configs/cloudinaryConfig.js";
import fs from "fs";

export const uploadAudioFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video", // Cloudinary treats audio as 'video'
      folder: "audio",
    });

    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Audio uploaded successfully",
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

export const updateAudioFile = async (req, res) => {
  try {
    const public_id = req.params.id;

    if (!public_id) {
      return res.status(400).json({ message: "Public ID is required in params." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No new audio file uploaded." });
    }

    await cloudinary.uploader.destroy(public_id, {
      resource_type: "video",
    });

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "audio",
    });

    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    return res.status(200).json({
      message: "Audio updated successfully",
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

export const deleteAudioFile = async (req, res) => {
  try {
    const public_id = req.params.id;

    if (!public_id) {
      return res.status(400).json({ message: "Public ID is required in params." });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "video",
    });

    if (result.result === "ok") {
      return res.status(200).json({ message: "Audio deleted successfully." });
    } else {
      return res.status(404).json({ message: "Audio not found." });
    }
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
