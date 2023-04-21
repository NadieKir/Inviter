import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getAnotherUsersInvites } from 'api';
import { Invite } from 'models';

export class AnotherUsersInvitesStore {
  anotherUsersInvites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getAnotherUsersInvites();
  }

  setAnotherUsersInvites(newInvites: Invite[]) {
    this.anotherUsersInvites = newInvites;
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
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}


