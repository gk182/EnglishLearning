import Topic from "../models/Topic.js";
import { topicValidation } from "../validation/topic.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    
    if (topics.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy chủ đề" });
    }

    return res.json(topics);
  } catch (err) {
    console.error("Error fetching topics:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createTopic = async (req, res) => {
  const { error } = topicValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, levels, lessons, type, img } = req.body;

  try {
    const newTopic = new Topic({ title, levels, lessons, type, img });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    console.error("Error creating topic:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateTopic = async (req, res) => {
  const { error } = topicValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, levels, lessons, type, img } = req.body;
  const { id } = req.params;

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, levels, lessons, type, img },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Chủ đề không tồn tại" });
    }

    res.json(updatedTopic);
  } catch (err) {
    console.error("Error updating topic:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteTopic = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return res.status(404).json({ message: "Chủ đề không tồn tại" });
    }

    res.json({ message: "Chủ đề đã được xóa thành công" });
  } catch (err) {
    console.error("Error deleting topic:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};