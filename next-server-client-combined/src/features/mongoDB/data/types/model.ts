import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Type = mongoose.models.Type || mongoose.model("Type", typeSchema);

export default Type;
