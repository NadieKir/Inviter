import mongoose from "mongoose";

const InviteResponseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invite",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("InviteResponse", InviteResponseSchema);
