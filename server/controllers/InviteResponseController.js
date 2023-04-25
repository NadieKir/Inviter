import InviteResponseModel from "../models/InviteResponse.model.js";
import InviteModel from "../models/Invite.model.js";

export const create = async (req, res) => {
  try {
    const doc = new InviteResponseModel({
      user: req.userId,
      invite: req.params.id,
      message: req.body.message,
    });

    const response = await doc.save();
    await InviteModel.findByIdAndUpdate(req.params.id, { $push: { responses: response } });

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать ответ на инвайт",
    });
  }
};

export const getAllCurrentUser = async (req, res) => {
  try {
    const responses = await InviteResponseModel.find({ user: req.userId })
      .populate("invite")
      .exec();

    res.json(responses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить ответы на инвайты",
    });
  }
};
