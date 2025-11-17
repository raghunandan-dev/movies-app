import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  keycloakId: { type: String, required: true, unique: true },
  username: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
