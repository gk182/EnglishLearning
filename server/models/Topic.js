import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  levels: {
    type: String,
    required: true,
  },
  imgUrl: { 
    type: String 
  },
  public_id: { 
    type: String 
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    }
  ],
}, { timestamps: true, versionKey: false } );;

export default mongoose.model("Topic", topicSchema);
