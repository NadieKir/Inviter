import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getAnotherUsersInvites } from 'api';
import { Invite } from 'models';
import { SearchInviteFilters } from 'types';

export class AnotherUsersInvitesStore {
  anotherUsersInvites: Invite[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor(filters?: SearchInviteFilters) {
    makeAutoObservable(this);
    this.getAnotherUsersInvites(filters);
  }

  setAnotherUsersInvites = (newInvites: Invite[]) => {
    this.anotherUsersInvites = newInvites;
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }

  setError = (error: AxiosError) => {
    this.error = error;
  }

  getAnotherUsersInvites = async (filters?: SearchInviteFilters) => {
    this.setIsLoading(true);

    try {
      this.setAnotherUsersInvites(await getAnotherUsersInvites(filters));
    }
    catch (error) {
      this.setError(error as AxiosError);
    }
    finally {
      this.setIsLoading(false);
    }
  }
}


