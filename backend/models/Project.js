import mongoose from "mongoose";
import { configDotenv } from "dotenv";


const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  files: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
