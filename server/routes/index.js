import express from "express"
import routerProduct from "./product.js"
import routerAuth from "./auth.js";
import routerCategory from "./category.js"
import routerGrammar from "./grammar.js";
import routerTopic from "./topic.js";
import routerUpload from "./upload.js"
const router = express.Router();

router.use('/product', routerProduct);
router.use('/auth', routerAuth);
router.use('/categories', routerCategory);
router.use('/grammar', routerGrammar);
router.use('/topic',routerTopic);
router.use('/upload', routerUpload);


export default router;