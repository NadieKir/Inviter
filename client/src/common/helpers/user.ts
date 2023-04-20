import { User } from "models";
import { getAge } from "./date";

export const getUserInfo = (c: User) => `${c.name}, ${getAge(new Date(c.birthday))}`;
