import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getCurrentUser, getCurrentUserResponses, getFollowings, login, respondInvite } from 'api';
import { InviteResponse, User } from 'models';
import { InviteRespondFormData, LoginFormData } from 'types';

export class CurrentUserStore {
  user: User | null = null;
  userResponses: InviteResponse[] = [];
  userFollowings: User[] = [];
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

  setUserFollowings = (followings: User[]) => {
    this.userFollowings = followings;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError | null) {
    this.error = error;
  }

  get isGuest() {
    return this.user === null;
  }

  loadFollowings = async () => {
    const followings = await getFollowings();
    this.setUserFollowings(followings ?? []);
  }

  loadUser = async () => {
    this.setIsLoading(true);

    try {
      const savedUserToken = localStorage.getItem('user');
      if (!savedUserToken) return;

      this.setUser(await getCurrentUser());
      this.setUserResponses(await getCurrentUserResponses());

      await this.loadFollowings();
    }
    catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    }
    finally {
      this.setError(null);
      this.setIsLoading(false);
    }
  }

  respondInvite = async (inviteId: string, values: InviteRespondFormData) => {
    try {
      await respondInvite(inviteId, values);
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
      //this.setError(null);
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
