import { httpClient } from 'api/httpClient';
import { Invite } from 'models';
import { InviteFormData, SearchInviteFilters } from 'types';

export const getInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites');
  return invites;
};

export const getAnotherUsersInvites = async (filters?: SearchInviteFilters): Promise<Invite[]> => {
  const filtersQueryParams =
    filters
      ? "?" + Object.entries(filters).map(e => {
        if (!e[1]) {
          return null;
        }

        if (Array.isArray(e[1])) {
          return e[1].map((v, i) => `${e[0]}[${i}]=${v}`).join("&");
        }

        return `${e[0]}=${e[1]}`;
      }).filter(Boolean).join("&")
      : '';

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
  newInvite: InviteFormData,
): Promise<Invite> => {
  const { data: createdInvite } = await httpClient.post<Invite>('/invites', newInvite);
  return createdInvite;
};

