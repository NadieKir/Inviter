import { City } from "./user.model";

export enum EventType {
	CIRCUS = "Цирк",
	CINEMA = "Кино",
	THEATER = "Театр",
	PARK = "Парк",
}

export interface Event {
	id: string;
	name: string;
	description: string;
	type: EventType;
	image?: string;
	url?: string;
	city: City;
	address: string;
	date: string;
	time: string;
};

export type MockedEvent = Partial<Event>;