import Lesson from "../models/Lesson.js";
import { lessonValidation } from "../validation/lesson.js";
import cloudinary from "./configs/cloudinaryConfig.js";
import fs from "fs";

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("topic");
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lesson", error });
  }
};

export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("topic");
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons", error });
  }
};

export const createLesson = async (req, res) => {
  const { error } = lessonValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    let url = "";
    let IDpublic = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video", // Cloudinary treats audio as 'video'
        folder: "lesson/audio",
      });
        url = result.secure_url;
        IDpublic = result.public_id;
        fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    }
    const newLesson = new Lesson({
        ...req.body,
        audioUrl: url || req.body.audio,
        public_id: IDpublic, // nếu có audio thì lấy audio mới, không thì lấy audio cũ (nếu có)
    });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ message: "Error creating lesson", error });
  }
};

export const updateLesson = async (req, res) => {
  const { error } = lessonValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    let audioUrl = lesson.audioUrl;
    let public_id = lesson.public_id;
    if (req.file) {
      if (public_id) {
        await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video", // Cloudinary xử lý audio như video
        folder: "lesson/audio",
      });
      audioUrl = result.secure_url;
      public_id = result.public_id;
      fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
    }
    const updatedData = {
      ...req.body,
      audioUrl,
      public_id,
    };
    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updatedData, {
      new: true,
    });
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: "Error updating lesson", error });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    if (lesson.public_id) {
      await cloudinary.uploader.destroy(lesson.public_id, { resource_type: "video" });
    }
    await Lesson.findByIdAndDelete(lessonId);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson", error });
  }
};

