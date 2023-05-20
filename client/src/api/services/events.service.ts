import { httpClient } from 'api/httpClient';
import { Event } from 'models/event.model';
import { EventFormData, SearchEventFilters } from 'types';
import { buildQueryParams } from './helpers';

export const getEvent = async (id: string): Promise<Event> => {
  const { data: event } = await httpClient.get<Event>(`/events/${id}`);
  return event;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await httpClient.delete<Event>(`/events/${id}`);
};

export const getEvents = async (filters?: SearchEventFilters): Promise<Event[]> => {
  const filterQueryParams = buildQueryParams(filters);
  const url = decodeURI(`/events${filterQueryParams}`);
  const { data: events } = await httpClient.get<Event[]>(url);

  return events;
};

export const createEvent = async (eventPayload: EventFormData): Promise<Event> => {
  const { data: event } = await httpClient.post<Event>('/events', eventPayload);

  return event;
};