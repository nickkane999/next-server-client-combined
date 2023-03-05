import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fname: { type: String },
  lname: { type: String },
  email: { type: String },
  phone: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
