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

export const getCurrentUserResponses = async (): Promise<InviteResponse[]> => {
  const { data: responses } = await httpClient.get<InviteResponse[]>('/invite-responses/current');
  return responses;
};
