import { httpClient } from 'api/httpClient';
import { User } from 'models';

export const getUser = async (id: string): Promise<User> => {
  const { data: user } = await httpClient.get<User>(`/users/${id}`);
  return user;
};

export const updateUser = async (
  user: User,
): Promise<User> => {
  const { data: updatedMeetup } = await httpClient.patch<User>(`/users`, user);

  return updatedMeetup;
};
