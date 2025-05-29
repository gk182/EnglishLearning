// middlewares/uploadAudio.js
import multer from "multer";
import path from "path";
import fs from "fs";

const audioFileFilter = (req, file, cb) => {
  const allowedTypes = /audio\/mpeg|audio\/wav|audio\/mp3|audio\/x-wav|audio\/m4a/;
  if (allowedTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được upload file âm thanh (mp3, wav, m4a)"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/audio/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAudio = multer({
  storage,
  fileFilter: audioFileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB giới hạn dung lượng file
});

export default uploadAudio;
