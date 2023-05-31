import { body } from "express-validator";

export const registerValidator = [body("email", "Неверный формат почты").isEmail()];

export const createInviteValidator = [
  body("subject", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("description", "Введите текст статьи").isLength({ min: 3 }).isString(),
];
