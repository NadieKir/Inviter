import { InviteType } from "./invite.model";
import { City } from "./user.model";

export interface Event {
	_id: string;
	name: string;
	description: string;
	type: InviteType;
	image?: string;
	url?: string;
	city: City;
	address: string;
	date: string;
	time: string;
};

export type MockedEvent = Partial<Event>;