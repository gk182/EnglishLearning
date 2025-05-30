import Topic from "../models/Topic.js";
import { topicValidation } from "../validation/topic.js";
import cloudinary from "./configs/cloudinaryConfig.js";
import fs from "fs";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics", error });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate("lessons");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topic", error });
  }
}

export const createTopic = async (req, res) => {
  const { error } = topicValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    let url = "";
    let IDpublic = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "topics/images",
      });
      url = result.secure_url;
      IDpublic = result.public_id,
      fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
    }
    const newTopic = new Topic({
      ...req.body,
      imgUrl: url || req.body.image, // nếu có ảnh thì lấy ảnh mới, không thì lấy ảnh cũ (nếu có)
      public_id: IDpublic,
    });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: "Error creating topic", error });
  }
};

export const updateTopic = async (req, res) => {
  const { error } = topicValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const topicId = req.params.id;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    let imgUrl = topic.imgUrl;
    let public_id = topic.public_id;
    if (req.file) {
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "topics/images",
      });
      imgUrl = result.secure_url;
      public_id = result.public_id;
      fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
    }
    const updatedData = {
      ...req.body,
      imgUrl,
      public_id,
    };
    const updatedTopic = await Topic.findByIdAndUpdate(topicId, updatedData, {
      new: true,
    });
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: "Error updating topic", error });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    if (topic.public_id) {
      await cloudinary.uploader.destroy(topic.public_id);
    }
    await Topic.findByIdAndDelete(topicId);
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting topic", error });
  }
};