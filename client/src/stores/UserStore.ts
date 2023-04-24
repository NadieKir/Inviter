import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getAnotherUserInvites, getUser } from 'api';
import { User } from 'models';

export class UserStore {
  user: User | null = null;
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor(login: string) {
    makeAutoObservable(this);
    this.loadUser(login);
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  get userInvites() {
    return this.user ? getAnotherUserInvites(this.user._id) : [] ;
  }

  loadUser = async (login: string) => {
    this.setIsLoading(true);

    try {
      this.setUser(await getUser(login));
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}