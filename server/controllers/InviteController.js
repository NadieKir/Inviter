import mongoose from "mongoose";
import dayjs from "dayjs";
import InviteModel from "../models/Invite.model.js";

export const create = async (req, res) => {
  try {
    const doc = new InviteModel({
      subject: req.body.subject,
      description: req.body.description,
      creator: req.userId,
      event: req.body.eventId,
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
    const invites = await InviteModel.find().sort({ createdAt: -1 }).populate("creator").exec();
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
    const currentDate = dayjs();

    const currentDateString = currentDate.format("YYYY-MM-DD");
    const currentTimeString = currentDate.format("HH:mm");

    const filters = Object.entries(req.query)
      .filter((e) => e[1])
      .reduce(
        (acc, v) => {
          if (v[0] === "gender") {
            acc["creator.gender"] = { $in: v[1] };
          } else if (v[0] === "keyWord") {
            acc["$or"] = [
              { "subject": { "$regex": v[1], "$options": "i" } },
              { "description": { "$regex": v[1], "$options": "i" } },
            ];
          }
          else {
            acc[v[0]] = v[1];
          }

          return acc;
        },
        {
          "creator._id": { $ne: new mongoose.Types.ObjectId(req.userId) },
        }
      );

    const invites = await InviteModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: {
          path: "$creator",
        },
      },
      {
        $match: {
          isDeleted: { $eq: false },
          $and: [
            filters,
            {
              $or: [
                {
                  $or: [
                    {
                      date: { $exists: false },
                    },
                    {
                      time: { $exists: false },
                    },
                  ],
                },
                {
                  $or: [
                    { date: { $gt: currentDateString } },
                    {
                      $and: [{
                        date: { $eq: currentDateString },
                      }, {
                        time: { $gte: currentTimeString }
                      }]
                    }
                  ],
                },
              ],
            },
          ],
        },
      },
    ])
      .allowDiskUse(true)
      .exec();

    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты",
    });
  }
};

export const getAllAnotherUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const invites = await InviteModel.find({ creator: userId })
      .sort({ createdAt: -1 })
      .populate("creator")
      .exec();
    res.json(invites);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить инвайты этого пользователя",
    });
  }
};

export const getAllCurrentUser = async (req, res) => {
  try {
    const invites = await InviteModel.find({ creator: req.userId })
      .sort({ createdAt: -1 })
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

export const getOne = async (req, res) => {
  try {
    const inviteId = req.params.id;
    const invite = await InviteModel.findById(inviteId).exec();
    res.json(invite);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить инвайт",
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const inviteId = req.params.id;
    await InviteModel.findByIdAndUpdate(inviteId, { isDeleted: true }).exec();

    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось удалить инвайт",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const inviteId = req.params.id;

    InviteModel.findOneAndDelete({ _id: inviteId })
      .then((doc) => {
        if (!doc) {
          return res.status(400).json({
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
