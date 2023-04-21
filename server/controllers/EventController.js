import EventModel from "../models/Event.model.js";

export const getAll = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить события",
    });
  }
};
