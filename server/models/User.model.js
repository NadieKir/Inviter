import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    orientation: {
      type: String,
      required: true,
    },
    familyStatus: {
      type: String,
      required: true,
    },
    alcoholAttitude: {
      type: String,
      required: true,
    },
    smokingAttitude: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    interests: {
      type: Array,
      required: true,
    },
    welcomeMessage: {
      type: String,
      required: true,
    },
    connectionMethods: {
      type: String,
      required: true,
    },
    preferredAge: {
      type: String,
      required: true,
    },
    // contacts: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //   default: [],
    // },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    // followings: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
