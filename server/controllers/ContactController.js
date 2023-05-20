import ContactModel from "../models/Contact.model.js";

export const getContacts = async (req, res) => {
  try {
    const userId = req.userId;
    const contacts = await ContactModel.find({ user: userId }).populate("contact").exec();
    const contactsUsers = contacts.map((f) => f.contact).reverse();

    res.json(contactsUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить контакты",
    });
  }
};

export const getAnotherUserContacts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const contacts = await ContactModel.find({ user: userId }).populate("contact").exec();
    const contactsUsers = contacts.map((f) => f.contact).reverse();

    res.json(contactsUsers);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить контакты",
    });
  }
};
