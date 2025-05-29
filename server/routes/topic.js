import express from "express";
import { createTopic, deleteTopic, getAllTopics, updateTopic } from '../controllers/topicController.js';
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();

router.get('/', getAllTopics);
router.get('/',checkPermission, createTopic);
router.get('/',checkPermission, updateTopic);
router.get('/',checkPermission, deleteTopic);


export default router;
