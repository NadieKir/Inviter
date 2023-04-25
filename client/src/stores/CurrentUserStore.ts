import { getCurrentUser, getCurrentUserResponses } from 'api';
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';
import { InviteResponse, User } from 'models';

export class CurrentUserStore {
  user: User | null = null;
  userResponses: InviteResponse[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
    this.loadUserResponses();
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

    const savedUserToken = localStorage.getItem('user');
    if (!savedUserToken) return;

    try {
      const savedUser = await getCurrentUser();
      this.setUser(savedUser);
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
    this.setIsLoading(true);

    try {
      this.setUserResponses(await getCurrentUserResponses());
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } 
    finally {
      this.setIsLoading(false);
    }
  }

  logout = () => {
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new CurrentUserStore();
