import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

import { registerValidator, createInviteValidator } from "./validations.js";
import { checkAuth, populateAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserController,
  FollowingController,
  InviteController,
  EventController,
  InviteResponseController,
  ContactController,
} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://nadiekir:admin21@invitercluster.wqpvioc.mongodb.net/inviter?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((error) => console.log("Error DB: " + error));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.use(express.json());

app.post("/uploads", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register);
app.post("/auth/login", handleValidationErrors, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/auth/login/:login", populateAuth, UserController.checkLogin);
app.get("/auth/email/:email", populateAuth, UserController.checkEmail);

app.patch("/users", checkAuth, UserController.update);
app.put("/users/profile", checkAuth, UserController.updateProfile);
app.put("/users/:userId/password", checkAuth, UserController.updatePassword);
app.get("/users", UserController.getAll);
app.get("/users/:login", UserController.getOne);
app.delete("/users/:userId", UserController.deleteOne);

app.get("/followings", checkAuth, FollowingController.getFollowings);
app.get("/followings/followers", checkAuth, FollowingController.getFollowers);
app.get("/followings/invites", checkAuth, FollowingController.getFollowingsInvites);
app.get("/followings/:userId", checkAuth, FollowingController.getAnotherUserFollowings);
app.get("/followings/followers/:userId", checkAuth, FollowingController.getAnotherUserFollowers);
app.post("/followings", checkAuth, FollowingController.addFollowing);
app.delete("/followings", checkAuth, FollowingController.removeFollowing);

app.get("/contacts", checkAuth, ContactController.getContacts);
app.get("/contacts/:userId", checkAuth, ContactController.getAnotherUserContacts);

// app.get("/invites", checkAuth, InviteController.getAll);
app.get("/invites/another", checkAuth, InviteController.getAllAnotherUsers);
app.get("/invites/another/:userId", checkAuth, InviteController.getAllAnotherUser);
app.get("/invites/current", checkAuth, InviteController.getAllCurrentUser);
app.get("/invites/:id", checkAuth, InviteController.getOne);
app.delete("/invites/:id", checkAuth, InviteController.deleteOne);
app.post(
  "/invites",
  checkAuth,
  createInviteValidator,
  handleValidationErrors,
  InviteController.create
);
app.patch(
  "/invites/:id",
  checkAuth,
  createInviteValidator,
  handleValidationErrors,
  InviteController.update
);
// app.delete("/invites/:id", checkAuth, InviteController.remove);

app.get("/invite-responses/current", checkAuth, InviteResponseController.getAllCurrentUser);
app.post("/invite-responses/:id", checkAuth, InviteResponseController.create);

app.get("/events", checkAuth, EventController.getAll);
app.get("/events/:id", checkAuth, EventController.getOne);
app.get("/events/:id/invites", checkAuth, EventController.getEventInvites);
app.delete("/events/:id", checkAuth, EventController.deleteOne);
app.post("/events", checkAuth, EventController.create);
app.put("/events/:id", checkAuth, EventController.update);

app.listen(8080, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Api server is up");
  console.log("listening on port 8080");
});
