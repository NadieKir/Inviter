import { User } from "./user.model";

export interface Following {
    user: User;
    followingUser: User;
}