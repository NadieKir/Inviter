import dayjs from "dayjs";

import EventModel from "../models/Event.model.js";
import InviteModel from "../models/Invite.model.js";

export const getAll = async (req, res) => {
  try {
    const currentDate = dayjs();

    const currentDateString = currentDate.format("YYYY-MM-DD");
    const currentTimeString = currentDate.format("HH:mm");

    const filter = Object.entries(req.query)
      .filter((e) => e[1])
      .reduce(
        (acc, v) => {
          if (v[0] === "tabType") {
            switch (v[1]) {
              case "current": {
                acc["$or"].push(
                  { date: { $gt: currentDateString } },
                  {
                    $and: [
                      {
                        date: { $eq: currentDateString },
                      },
                      {
                        time: { $gte: currentTimeString },
                      },
                    ],
                  }
                );

                break;
              }
              case "past": {
                acc["$or"].push(
                  { date: { $lt: currentDateString } },
                  {
                    $and: [
                      {
                        date: { $eq: currentDateString },
                      },
                      {
                        time: { $lte: currentTimeString },
                      },
                    ],
                  }
                );

                break;
              }
            }
          } else {
            acc[v[0]] = v[1];
          }

          return acc;
        },
        { isDeleted: { $eq: false }, $or: [] }
      );

    const events = await EventModel.find({
      $and: [filter],
    })
      .sort({ date: 1, time: 1 })
      .exec();

    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить события",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventModel.findById(eventId);
    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить событие",
    });
  }
};

export const getEventInvites = async (req, res) => {
  try {
    const userId = req.userId;
    const eventId = req.params.id;
    const eventInvites = await InviteModel.find({
      $and: [
        {
          creator: { $ne: userId },
        },
        {
          event: { $exists: true, $eq: eventId },
        },
      ],
    }).populate("creator");

    res.json(eventInvites);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить событие",
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const eventId = req.params.id;
    await EventModel.findByIdAndUpdate(eventId, { isDeleted: true });
    await InviteModel.updateMany({ event: eventId }, { isDeleted: true });
    res.send(200);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось удалить событие",
    });
  }
};

export const create = async (req, res) => {
  try {
    const document = new EventModel({
      name: req.body.name,
      creator: req.userId,
      lastEditor: req.userId,
      description: req.body.description,
      type: req.body.type,
      city: req.body.city,
      address: req.body.address,
      date: req.body.date,
      time: req.body.time,
      image: req.body.image,
      url: req.body.url,
      isDeleted: "false",
    });

    const event = document.save();

    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать событие",
    });
  }
};

export const update = async (req, res) => {
  try {
    const eventId = req.params.id;

    const newEvent = await EventModel.findByIdAndUpdate(eventId, {
      name: req.body.name,
      creator: req.userId,
      lastEditor: req.userId,
      description: req.body.description,
      type: req.body.type,
      city: req.body.city,
      address: req.body.address,
      date: req.body.date,
      time: req.body.time,
      image: req.body.image,
      url: req.body.url,
    }).exec();

    res.json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить событие",
    });
  }
};
