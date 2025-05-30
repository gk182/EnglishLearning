import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema({
  audioUrl: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const lessonSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  scripts: [scriptSchema],
}, { timestamps: true, versionKey: false });

export default mongoose.model("Lesson", lessonSchema);
