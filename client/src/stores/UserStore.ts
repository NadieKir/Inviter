import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getAnotherUserInvites, getUser } from 'api';
import { Invite, User } from 'models';

export class UserStore {
  user: User | null = null;
  userInvites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor(login: string) {
    makeAutoObservable(this);
    this.loadUserAndInvites(login);
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  setUserInvites(newUserInvites: Invite[]) {
    this.userInvites = newUserInvites;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  loadUserAndInvites = async (login: string) => {
    this.setIsLoading(true);

    try {
      const user = await getUser(login);
      this.setUser(user);

      if (user === null) {
        return;
      }

      const invites = await getAnotherUserInvites(user._id)
      this.setUserInvites(invites);
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