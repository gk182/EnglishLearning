import express from "express";
import { createTopic, deleteTopic, getAllTopics, getTopicById, updateTopic } from '../controllers/topicController.js';
import { checkPermission } from "../middlewares/checkPermission.js";
import uploadImage from "../middlewares/uploadImage.js";

const router = express.Router();

router.get('/', getAllTopics);
router.get('/:id', getTopicById);

router.post('/', checkPermission, uploadImage.single("image"), createTopic);
router.put('/:id', checkPermission, uploadImage.single("image"), updateTopic);
router.delete('/:id', checkPermission,  deleteTopic);

export default router;
