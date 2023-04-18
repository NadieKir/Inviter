import InviteModel from "../models/Invite.model.js";

export const create = async (req, res) => {
  try {
    const doc = new InviteModel({
      subject: req.body.subject,
      description: req.body.description,
      creator: req.userId,
      city: req.body.city,
      type: req.body.type,
      address: req.body.address,
      date: req.body.date,
      time: req.body.time,
      companionAge: req.body.companionAge,
      companionGender: req.body.companionGender,
      companionsAmount: req.body.companionsAmount,
    });

    const invite = await doc.save();

    res.json(invite);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать инвайт",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const invites = await InviteModel.find().populate("creator").exec();
    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты",
    });
  }
};

export const getAllAnotherUsers = async (req, res) => {
  try {
    const invites = await InviteModel.find({ creator: { $ne: req.userId } })
      .populate("creator")
      .exec();
    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты",
    });
  }
};

export const getAllCurrentUser = async (req, res) => {
  try {
    const invites = await InviteModel.find({ creator: req.userId }).populate("creator").exec();
    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const inviteId = req.params.id;
    const invite = await InviteModel.findById(inviteId).exec();
    res.json(invite);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Не удалось получить инвайт",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const inviteId = req.params.id;

    InviteModel.findOneAndDelete({ _id: inviteId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Инвайт не найден",
          });
        }

        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить инвайт",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты",
    });
  }
};

export const update = async (req, res) => {
  try {
    const inviteId = req.params.id;

    await InviteModel.updateOne(
      {
        _id: inviteId,
      },
      {
        subject: req.body.subject,
        description: req.body.description,
        creator: req.userId,
        city: req.body.city,
        type: req.body.type,
        address: req.body.address,
        date: req.body.date,
        time: req.body.time,
        companionAge: req.body.companionAge,
        companionGender: req.body.companionGender,
        companionsAmount: req.body.companionsAmount,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
