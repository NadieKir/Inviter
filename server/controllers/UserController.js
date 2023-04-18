import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      login: req.body.login,
      birthday: req.body.birthday,
      image: req.body.image,
      city: req.body.city,
      gender: req.body.gender,
      orientation: req.body.orientation,
      familyStatus: req.body.familyStatus,
      alcoholAttitude: req.body.alcoholAttitude,
      smokingAttitude: req.body.smokingAttitude,
      languages: req.body.languages,
      interests: req.body.interests,
      welcomeMessage: req.body.welcomeMessage,
      connectionMethods: req.body.connectionMethods,
      preferredAge: req.body.preferredAge,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ login: req.body.login });

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Не удалось получить пользователя",
    });
  }
};
