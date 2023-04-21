import { httpClient } from 'api/httpClient';
import { User } from 'models';

export const getUser = async (login: string): Promise<User> => {
  const { data: user } = await httpClient.get<User>(`/users/${login}`);
  return user;
};

export const updateUser = async (
  user: User,
): Promise<User> => {
  const { data: updatedMeetup } = await httpClient.patch<User>(`/users`, user);
  return updatedMeetup;
};
