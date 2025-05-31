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
  console.log(req.body, req.files);
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

    const updateTopic = await Topic.findByIdAndUpdate(newLesson.topic, {
      $addToSet: {
        lessons: newLesson._id,
      },
    });

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
  const texts = Array.isArray(req.body.texts) ? req.body.texts : [req.body.texts];
  const audioUrls = Array.isArray(req.body.audioUrls) ? req.body.audioUrls : [req.body.audioUrls];
  const public_ids = Array.isArray(req.body.public_ids) ? req.body.public_ids : [req.body.public_ids];

  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    let scripts = [];
    let fileIdx = 0;

    for (let i = 0; i < texts.length; i++) {
      if (req.files && req.files[fileIdx] && req.files[fileIdx].fieldname === "audio") {
        // Có file mới
        const file = req.files[fileIdx];
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
        fileIdx++;
      } else {
        // Không có file mới, giữ nguyên audioUrl/public_id cũ
        scripts.push({
          audioUrl: audioUrls[i],
          public_id: public_ids[i],
          text: texts[i],
        });
      }
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
