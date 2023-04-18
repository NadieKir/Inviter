import { getInvites } from 'api';
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { Invite } from 'models';

export class InviteListStore {
  invites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getInvites();
  }

  setInvites(newInvites: Invite[]) {
    this.invites = newInvites;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  async getInvites() {
    this.setIsLoading(true);

    try {
      this.setInvites(await getInvites());
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

export default new InviteListStore();
