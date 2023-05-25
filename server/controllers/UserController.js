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
    const user = await UserModel.findOne({ login: req.body.login }).lean();

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

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

    const { passwordHash, ...userData } = user;

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
    const user = await UserModel.findById(req.userId, { passwordHash: 0 }).lean();

    if (!user) {
      return res.status(400).json({
        message: "Пользователь не найден",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const userLogin = req.params.login;
    const user = await UserModel.findOne({ login: userLogin }).lean();

    if (user === null) {
      res.status(404).json({
        message: "Пользователь не найден",
      });

      return;
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить пользователя",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const userLoginOrName = req.query.nameOrLogin;
    let filters = undefined;

    if (userLoginOrName) {
      filters = {
        $or: [
          {
            login: { $regex: userLoginOrName, $options: "i" },
          },
          {
            name: { $regex: userLoginOrName, $options: "i" },
          },
        ],
        $and: [
          {
            role: "Пользователь",
          },
        ],
      };
    }

    const users = await UserModel.find(filters).lean();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Не удалось получить пользователей по имени или логину",
    });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.userId;

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
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
        passwordHash: req.body.passwordHash,
      },
      {
        returnDocument: "after",
      }
    ).then((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось обновить пользователя",
        });
      }

      if (!doc) {
        return res.status(400).json({
          message: "Пользователь не найден",
        });
      }

      res.json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить пользователя",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        name: req.body.name,
        login: req.body.login,
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
      },
      {
        returnDocument: "after",
      }
    ).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось обновить профиль пользователя",
        });
      }

      if (!doc) {
        return res.status(400).json({
          message: "Пользователь не найден",
        });
      }

      res.json(doc);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить пользователя",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId, { passwordHash: 1 }).lean();

    const salt = await bcrypt.genSalt(10);

    const oldPassword = req.body.oldPassword;

    const isValidPass = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isValidPass) {
      res.status(400).json({
        message: "Введен неправильный старый пароль",
      });

      return;
    }

    const newPassword = req.body.newPassword;
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    const doc = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { passwordHash: newPasswordHash } },
      {
        returnDocument: "after",
      }
    ).lean();

    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить пароль пользователя",
    });
  }
};

export const checkLogin = async (req, res) => {
  try {
    const login = req.params.login;
    const userId = req.userId;

    const user = await UserModel.findOne({ login: login, _id: { $ne: userId } }).lean();

    if (!user) {
      res.json(false);

      return;
    }

    res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось проверить логин",
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const userId = req.userId;

    const user = await UserModel.findOne({ email: email, _id: { $ne: userId } }).lean();

    if (!user) {
      res.json(false);

      return;
    }

    res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось проверить почту",
    });
  }
};
