import { httpClient } from 'api/httpClient';
import { User, UserWithToken } from 'models';
import { LoginFormData, LoginFormFields, RegistrationFormData, RegistrationFormFields } from 'types';


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

// export const checkLogin = async (): Promise<AuthoraizedUser> => {
//   const { data: response } = await httpClient.get('/auth/me');
//   return response.user;
// };

// export const logout = async (): Promise<void> => {
//   await httpClient.get('/logout');
// };
