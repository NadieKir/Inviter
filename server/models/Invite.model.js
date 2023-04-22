import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      lowercase: true,
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
    address: String,
    date: String,
    time: String,
    companionAge: String,
    companionGender: {
      type: Array,
      default: ["Мужской", "Женский"],
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
