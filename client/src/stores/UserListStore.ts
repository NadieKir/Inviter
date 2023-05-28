import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getUsers } from 'api';
import { Role, User } from 'models';

export class UserListStore {
  users: User[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor() {
    makeAutoObservable(this);
    this.getUsers();
  }

  setUsers = (newUsers: User[]) => {
    this.users = newUsers;
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }

  setError = (error: AxiosError) => {
    this.error = error;
  }

  get usersWithoutAdmins() {
    return this.users.filter(user => user.role === Role.USER);
  }

  getUsers = async () => {
    this.setIsLoading(true);

    try {
      this.setUsers(await getUsers());
    }
    catch (error) {
      this.setError(error as AxiosError);
    }
    finally {
      this.setIsLoading(false);
    }
  }
}

