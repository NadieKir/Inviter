import { httpClient } from 'api/httpClient';
import { Invite } from 'models';
import { InviteFormData, SearchInviteFilters } from 'types';
import { buildQueryParams } from './helpers';

export type InvitePayload = InviteFormData & {
  eventId?: string;
};

export const getInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites');
  return invites;
};

export const getAnotherUsersInvites = async (filters?: SearchInviteFilters): Promise<Invite[]> => {
  const filtersQueryParams = buildQueryParams(filters);

  const url = decodeURI(`/invites/another${filtersQueryParams}`);

  const { data: invites } = await httpClient.get<Invite[]>(url);
  return invites;
};

export const getAnotherUserInvites = async (userId: string): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>(`/invites/another/${userId}`);
  return invites;
};

export const getCurrentUserInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites/current');
  return invites;
};

export const createInvite = async (
  newInvite: InvitePayload,
): Promise<Invite> => {
  const { data: createdInvite } = await httpClient.post<Invite>('/invites', newInvite);
  return createdInvite;
};

