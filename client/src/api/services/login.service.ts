import { httpClient } from 'api/httpClient';
import { User, UserWithToken } from 'models';
import { LoginFormData, RegistrationFormData } from 'types';


export const login = async (credentials: LoginFormData): Promise<UserWithToken> => {
  const { data: response } = await httpClient.post('/auth/login', credentials);
  return response;
};

export const register = async (credentials: RegistrationFormData): Promise<UserWithToken> => {
  const { data: response } = await httpClient.post('/auth/register', credentials);
  return response;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data: user } = await httpClient.get<User>('/auth/me');
  return user;
};
