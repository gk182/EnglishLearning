import express from "express";
import { checkGrammar } from '../controllers/grammarController.js';

const router = express.Router();

router.post('/', checkGrammar);

export default router;
