import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    companionAge: {
      type: String,
      default: "",
    },
    companionGender: {
      type: Array,
      default: [],
    },
    companionsAmount: {
      type: String,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invite", InviteSchema);
