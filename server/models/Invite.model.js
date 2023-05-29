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
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: String,
    date: String,
    time: String,
    companionAge: String,
    companionGender: {
      type: Array,
      default: ["Мужской", "Женский"],
    },
    companions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invite", InviteSchema);
