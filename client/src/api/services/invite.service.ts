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

export const approveInvite = async (inviteId: string): Promise<Invite> => {
  const { data: invites } = await httpClient.patch<Invite>(`/invites/${inviteId}/approve`);

  return invites;
};

export const markInviteAsPast = async (inviteId: string): Promise<Invite> => {
  const { data: invite } = await httpClient.patch<Invite>(`/invites/${inviteId}/markAsPast`);

  return invite;
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

export const updateInvite = async (
  inviteId: string,
  updateInvite: InvitePayload,
): Promise<Invite> => {
  const { data: updatedInvite } = await httpClient.put<Invite>(`/invites/${inviteId}`, updateInvite);

  return updatedInvite;
};


export const deleteInvite = async (inviteId: string): Promise<void> => {
  await httpClient.delete<Invite>(`/invites/${inviteId}`);
};

export const deleteInviteCompanion = async (inviteId: string, companionId: string): Promise<void> => {
  await httpClient.delete<Invite>(`/invites/${inviteId}/companions/${companionId}`);
};