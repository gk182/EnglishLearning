import Router from "express";
import uploadImage from "../middlewares/uploadImage.js";
import { deleteImagesFile, updateImagesFile, uploadImagesFile } from "../controllers/images.js";
import { deleteAudioFile, updateAudioFile, uploadAudioFile } from "../controllers/audio.js";
import uploadAudio from "../middlewares/uploadAudio.js";

const router = Router();

router.post("/image",uploadImage.single("image"), uploadImagesFile);
router.put("/image/:id", uploadImage.single("image"), updateImagesFile);
router.delete("/image/:id", deleteImagesFile);



router.post("/audio", uploadAudio.single("audio"), uploadAudioFile);
router.put("/audio/:id", uploadAudio.single("audio"), updateAudioFile);
router.delete("/audio/:id", deleteAudioFile);


export default router;
