import { User } from "models";
import { getAge } from "./date";

export const concatUserNameAndAge = (user: User) => `${user.name}, ${getAge(new Date(user.birthday))}`;
