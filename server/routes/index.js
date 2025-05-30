import express from "express"
import routerAuth from "./auth.js";
import routerGrammar from "./grammar.js";
import routerTopic from "./topic.js";
import routerLesson from "./lesson.js"
const router = express.Router();

router.use('/auth', routerAuth);
router.use('/grammar', routerGrammar);
// router.use('/upload', routerUpload);

router.use('/topic',routerTopic);
router.use('/lesson',routerLesson);
export default router;