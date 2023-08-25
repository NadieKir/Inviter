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

export const checkLogin = async (login: string): Promise<boolean> => {
  const result = await httpClient.get<boolean>(`auth/login/${login}`);
  return result.data;
}

export const checkEmail = async (email: string): Promise<boolean> => {
  const result = await httpClient.get<boolean>(`auth/email/${email}`);

  return result.data;
}