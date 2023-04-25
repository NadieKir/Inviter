import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getCurrentUser, getCurrentUserResponses, login } from 'api';
import { InviteResponse, User } from 'models';
import { LoginFormData } from 'types';

export class CurrentUserStore {
  user: User | null = null;
  userResponses: InviteResponse[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  setUserResponses(newUserResponses: InviteResponse[]) {
    this.userResponses = newUserResponses;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get isGuest() {
    return this.user === null;
  }
  
  loadUser = async () => {
    this.setIsLoading(true);

    try {
      const savedUserToken = localStorage.getItem('user');
      if (!savedUserToken) return;

      this.setUser(await getCurrentUser());
      this.loadUserResponses();
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  loadUserResponses = async () => {
    try {
      this.setUserResponses(await getCurrentUserResponses());
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } 
  }

  login = async (values: LoginFormData) => {
    try {
      this.setIsLoading(true);

      const user = await login(values);

      this.setUser(user);
      localStorage.setItem('user', user.token);
    } catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } finally {
      this.setIsLoading(false);
    }
  }

  logout = () => {
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new CurrentUserStore();
