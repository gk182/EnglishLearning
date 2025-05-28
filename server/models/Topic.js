import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
    },
  levels: {
     type: String, 
     required: true 
    },
  lessons: { 
    type: Number, 
    required: true 
    },
  type: { 
    type: String, 
    enum: ["audio", "video"], 
    required: true 
    },
  img: { 
    type: String, 
    required: true 
    },
});

export default mongoose.model("Topic", topicSchema);
