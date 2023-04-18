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

export const getCurrentUserInvites = async (): Promise<Invite[]> => {
  const { data: invites } = await httpClient.get<Invite[]>('/invites/current');

  return invites;
};

export const createInvite = async (
  newInviteData: InviteFormData,
): Promise<Invite> => {
  const { data: createdInvite } = await httpClient.post<Invite>('/invites', newInviteData);

  return createdInvite;
};

// export const getMeetup = async (id: string): Promise<Meetup> => {
//   const { data: meetup } = await httpClient.get<Meetup>(`/meetups/${id}`);

//   return meetup;
// };

// export const createMeetup = async (
//   newMeetupData: TopicFormData,
// ): Promise<Topic> => {
//   const { data: createdMeetup } = await httpClient.post<Topic>('/meetups', newMeetupData);

//   return createdMeetup;
// };

// export const updateMeetup = async (
//   updatedMeetupData: Meetup,
// ): Promise<Meetup> => {
//   const { data: updatedMeetup } = await httpClient.put<Meetup>('/meetups', updatedMeetupData);

//   return updatedMeetup;
// };

// export const deleteMeetup = async (id: string): Promise<void> => {
//   await httpClient.delete(`/meetups/${id}`);
// };
