import Lesson from "../models/Lesson.js";
import Topic from "../models/Topic.js";
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
  const { title, topic } = req.body;
  const texts = Array.isArray(req.body.texts)
    ? req.body.texts
    : [req.body.texts];
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No audio files uploaded" });
    }
    if (texts.length !== req.files.length) {
      return res
        .status(400)
        .json({ message: "Số lượng audio và text không khớp" });
    }
    const scripts = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
        folder: "lesson/audio",
      });
      scripts.push({
        audioUrl: result.secure_url,
        public_id: result.public_id,
        text: texts[i],
      });
      fs.existsSync(file.path) && fs.unlinkSync(file.path);
    }
    const newLesson = new Lesson({
      title,
      topic,
      scripts,
    });
    await newLesson.save();

    const updateTopic = await Topic.findByIdAndUpdate(
      newLesson.topic,
      {
        $addToSet: {
          lessons: newLesson._id,
        },
      }
    );

    if (!updateTopic) {
      return res.status(404).json({
        message: "update Topic not succesful",
      });
    }
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ message: "Error creating lesson", error });
  }
};

export const updateLesson = async (req, res) => {
  const { title, topic } = req.body;
  // texts có thể là mảng hoặc string (nếu chỉ 1 text)
  const texts = Array.isArray(req.body.texts)
    ? req.body.texts
    : [req.body.texts];

  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    let scripts = [];

    // Nếu có file audio mới gửi lên
    if (req.files && req.files.length > 0) {
      if (texts.length !== req.files.length) {
        return res
          .status(400)
          .json({ message: "Số lượng audio và text không khớp" });
      }
      // Xóa audio cũ trên cloudinary
      for (const script of lesson.scripts) {
        if (script.public_id) {
          await cloudinary.uploader.destroy(script.public_id, {
            resource_type: "video",
          });
        }
      }
      // Upload audio mới và ghép với text mới
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "video",
          folder: "lesson/audio",
        });
        scripts.push({
          audioUrl: result.secure_url,
          public_id: result.public_id,
          text: texts[i],
        });
        fs.existsSync(file.path) && fs.unlinkSync(file.path);
      }
    } else {
      // Không upload audio mới, giữ lại scripts cũ hoặc cập nhật text nếu cần
      scripts = lesson.scripts;
    }

    lesson.title = title || lesson.title;
    lesson.topic = topic || lesson.topic;
    lesson.scripts = scripts;

    await lesson.save();
    res.status(200).json(lesson);
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
    // Xóa toàn bộ audio trên cloudinary nếu có
    if (lesson.scripts && lesson.scripts.length > 0) {
      for (const script of lesson.scripts) {
        if (script.public_id) {
          await cloudinary.uploader.destroy(script.public_id, {
            resource_type: "video",
          });
        }
      }
    }
    await Lesson.findByIdAndDelete(lessonId);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson", error });
  }
};
