import { httpClient } from 'api/httpClient';
import { Invite } from 'models';
import { InviteFormData } from 'types';

export const getInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites');
  return invites;
};

export const getAnotherUsersInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites/another');
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
  newInvite: InviteFormData,
): Promise<Invite> => {
  const { data: createdInvite } = await httpClient.post<Invite>('/invites', newInvite);
  return createdInvite;
};

