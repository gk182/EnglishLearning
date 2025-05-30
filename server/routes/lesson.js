import express from "express";
import { createLesson, deleteLesson, getAllLessons, getLessonById, updateLesson } from "../controllers/lessonController.js";
import { checkPermission } from "../middlewares/checkPermission.js";
import uploadAudio from "../middlewares/uploadAudio.js";

const router = express.Router();

router.get('/', getAllLessons);
router.get('/:id', getLessonById);

router.post('/',checkPermission, uploadAudio.single("audio"), createLesson);
router.put('/:id',checkPermission, uploadAudio.single("audio"), updateLesson);
router.delete('/:id',checkPermission, deleteLesson);


export default router;
