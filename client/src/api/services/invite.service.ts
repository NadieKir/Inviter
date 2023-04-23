import { httpClient } from 'api/httpClient';
import { Invite } from 'models';
import { InviteFormData, InviteRespondFormData } from 'types';


export const getInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites');
  return invites;
};

export const getAnotherUsersInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites/another');
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

export const respondInvite = async (
  id: string,
  response: InviteRespondFormData,
): Promise<Invite> => {
  const { data: updatedInvite } = await httpClient.patch<Invite>(`/invite-responses/${id}`, response);
  return updatedInvite;
};
