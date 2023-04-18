import { getAnotherUsersInvites, getCurrentUserInvites, getInvites } from 'api';
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { Invite } from 'models';

export class InviteListStore {
  // invites: Invite[] = [];
  anotherUsersInvites: Invite[] = [];
  currentUserInvites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    // this.getInvites();
    this.getAnotherUsersInvites();
    this.getCurrentUserInvites();
  }

  // setInvites(newInvites: Invite[]) {
  //   this.invites = newInvites;
  // }

  setAnotherUsersInvites(newInvites: Invite[]) {
    this.anotherUsersInvites = newInvites;
  }

  setCurrentUserInvites(newInvites: Invite[]) {
    this.currentUserInvites = newInvites;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  async getAnotherUsersInvites() {
    this.setIsLoading(true);

    try {
      this.setAnotherUsersInvites(await getAnotherUsersInvites());
    }
    catch (error) {
      this.setAnotherUsersInvites([]);
      // this.setError(error as AxiosError);
      // throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  async getCurrentUserInvites() {
    this.setIsLoading(true);

    try {
      this.setCurrentUserInvites(await getCurrentUserInvites());
    }
    catch (error) {
      this.setCurrentUserInvites([]);
      // this.setError(error as AxiosError);
      // throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  // async getInvites() {
  //   this.setIsLoading(true);

  //   try {
  //     this.setInvites(await getInvites());
  //   }
  //   catch (error) {
  //     this.setError(error as AxiosError);
  //     throw this.error;
  //   } 
  //   finally {
  //     this.setIsLoading(false);
  //   }
  // }
}

export default new InviteListStore();
