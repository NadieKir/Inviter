import { httpClient } from 'api/httpClient';
import { Event } from 'models/event.model';
import { EventFormData, SearchEventFilters } from 'types';
import { buildQueryParams } from './helpers';
import { Invite } from 'models';

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

export const getEventInvites = async (eventId: string): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>(`/events/${eventId}/invites`);

  return invites;
};

export const createEvent = async (eventPayload: EventFormData): Promise<Event> => {
  const { data: event } = await httpClient.post<Event>('/events', eventPayload);

  return event;
};

export const updateEvent = async (eventId: string, eventPayload: EventFormData): Promise<Event> => {
  const { data: event } = await httpClient.put<Event>(`/events/${eventId}`, eventPayload);

  return event;
};