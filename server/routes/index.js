import express from "express"
import routerProduct from "./product.js"
import routerAuth from "./auth.js";
import routerCategory from "./category.js"
const router = express.Router();

router.use('/product', routerProduct);
router.use('/auth', routerAuth);
router.use('/categories', routerCategory);


export default router;