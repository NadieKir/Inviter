import EventModel from "../models/Event.model.js";

export const getAll = async (req, res) => {
  try {
    const filter = Object.entries(req.query)
      .filter((e) => e[1])
      .reduce((acc, v) => {
        acc[v[0]] = v[1];

        return acc;
      }, {});

    const events = await EventModel.find({ $and: [filter] });

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
