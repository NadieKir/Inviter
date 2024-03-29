import { httpClient } from 'api/httpClient';
import { User } from 'models';
import { ChangePasswordFormData, EditAdminProfileFormData, EditProfileFormData } from 'types';

export type ChangePasswordPayload = {
  userId: string;
  formData: ChangePasswordFormData;
}

export const getUser = async (login: string): Promise<User> => {
  const { data: user } = await httpClient.get<User>(`/users/${login}`);

  return user;
};

export const deleteUser = async (userId: string): Promise<string> => {
  const { data: message } = await httpClient.delete<string>(`/users/${userId}`);

  return message;
};

export const unlockUser = async (userId: string): Promise<string> => {
  const { data: message } = await httpClient.put<string>(`/users/${userId}/unlock`);

  return message;
};

export const getUsers = async (nameOrLogin?: string): Promise<User[]> => {
  let url = '/users';

  if (nameOrLogin) {
    url += `?nameOrLogin=${nameOrLogin}`;
  }

  const { data: users } = await httpClient.get<User[]>(url);

  return users;
};

export const updateUser = async (
  user: User,
): Promise<User> => {
  const { data: updatedUser } = await httpClient.patch<User>(`/users`, user);

  return updatedUser;
};

export const updateUserProfile = async (
  profile: EditProfileFormData | EditAdminProfileFormData,
): Promise<User> => {
  const { data: updatedProfile } = await httpClient.put<User>(`/users/profile`, profile);

  return updatedProfile;
};

export const updateUserPassword = async (
  payload: ChangePasswordPayload,
): Promise<User> => {
  const { data: updatedUser } = await httpClient.put<User>(`/users/${payload.userId}/password`, payload.formData);

  return updatedUser;
};
