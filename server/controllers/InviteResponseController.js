import InviteResponseModel from "../models/InviteResponse.model.js";
import InviteModel from "../models/Invite.model.js";
import ContactModel from "../models/Contact.model.js";

export const create = async (req, res) => {
  try {
    const doc = new InviteResponseModel({
      user: req.userId,
      invite: req.params.id,
      message: req.body.message,
    });

    const response = await doc.save();

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать ответ на инвайт",
    });
  }
};

export const approve = async (req, res) => {
  try {
    const deletedResponse = await InviteResponseModel.findByIdAndDelete(req.params.responseId);

    console.log(deletedResponse);

    await InviteModel.findByIdAndUpdate(deletedResponse.invite, { $push: { companions: deletedResponse.user } });

    let userToResponderContact = await ContactModel.findOne({
      user: req.userId,
      contact: deletedResponse.user,
    });

    if (userToResponderContact === null) {
      userToResponderContact = new ContactModel({
        user: req.userId,
        contact: deletedResponse.user,
      });

      await userToResponderContact.save();
    }

    let responderToUserContact = await ContactModel.findOne({
      user: deletedResponse.user,
      contact: req.userId,
    });

    if (responderToUserContact === null) {
      responderToUserContact = new ContactModel({
        user: deletedResponse.user,
        contact: req.userId,
      });

      await responderToUserContact.save();
    }

    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось утвердить ответ на инвайт",
    });
  }
};

export const deleteOther = async (req, res) => {
  try {
    await InviteResponseModel.findByIdAndDelete(req.params.responseId);

    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить ответ на инвайт",
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const deletedResponse = await InviteResponseModel.findOneAndDelete({ invite: req.params.id, user: req.userId });

    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить ответ на инвайт",
    });
  }
};

export const getAllCurrentUser = async (req, res) => {
  try {
    const responses = await InviteResponseModel.find({ user: req.userId })
      .populate(
        {
          path: 'invite',
          populate: ['creator', 'companions', 'event']
        })
      .exec();

    res.json(responses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить ответы на инвайты",
    });
  }
};
