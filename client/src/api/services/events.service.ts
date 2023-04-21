import { httpClient } from 'api/httpClient';
import { Event } from 'models/event.model';

export const getEvents = async (): Promise<Event[]> => {
  const { data: events } = await httpClient.get<Event[]>('/events');
  return events;
};
