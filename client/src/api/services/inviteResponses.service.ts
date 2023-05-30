import { httpClient } from 'api/httpClient';
import { InviteResponse } from 'models';
import { InviteRespondFormData } from 'types';

export const respondInvite = async (
  id: string,
  message: InviteRespondFormData,
): Promise<InviteResponse> => {
  const { data: response } = await httpClient.post<InviteResponse>(`/invite-responses/${id}`, message);
  return response;
};

export const approveOtherInviteResponse = async (responseId: string): Promise<void> => {
  await httpClient.patch<InviteResponse>(`/invite-responses/${responseId}/approve`);
};

export const deleteOtherInviteResponse = async (responseId: string): Promise<void> => {
  await httpClient.delete<InviteResponse>(`/invite-responses/${responseId}/delete`);
};

export const deleteInviteResponse = async (id: string): Promise<void> => {
  await httpClient.delete<InviteResponse>(`/invite-responses/${id}`);
};

export const getCurrentUserResponses = async (): Promise<InviteResponse[]> => {
  const { data: responses } = await httpClient.get<InviteResponse[]>('/invite-responses/current');
  return responses;
};
