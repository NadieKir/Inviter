import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidator, createInviteValidator } from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, InviteController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://nadiekir:admin21@invitercluster.wqpvioc.mongodb.net/inviter?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((error) => console.log("Error DB: " + error));

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/register", registerValidator, handleValidationErrors, UserController.register);
app.post("/auth/login", handleValidationErrors, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/users/:id", UserController.getOne);

app.get("/invites", InviteController.getAll);
app.get("/invites/:id", InviteController.getOne);
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
app.delete("/invites/:id", checkAuth, InviteController.remove);

app.listen(8080, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Api server is up");
  console.log("listening on port 8080");
});
