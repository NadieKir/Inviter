import { City } from "./user.model";

export interface Event {
    id: string;
    name: string;
    description: string;
    image?: string;
    url?: string;
    city: City;
    address: string;
    date: string;
    time: string;
}