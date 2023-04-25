import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

import { getCurrentUserInvites } from 'api';
import { Invite } from 'models';

export class CurrentUserInvitesStore {
  currentUserInvites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getCurrentUserInvites();
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

  async getCurrentUserInvites() {
    this.setIsLoading(true);

    try {
      this.setCurrentUserInvites(await getCurrentUserInvites());
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}

