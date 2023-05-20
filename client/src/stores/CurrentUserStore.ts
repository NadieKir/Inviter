import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getContacts, getCurrentUser, getCurrentUserResponses, getFollowers, getFollowings, login, respondInvite } from 'api';
import { InviteResponse, User } from 'models';
import { InviteRespondFormData, LoginFormData } from 'types';

export class CurrentUserStore {
  user: User | null = null;
  userResponses: InviteResponse[] = [];
  userFollowings: User[] = [];
  userFollowers: User[] = [];
  userContacts: User[] = [];
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

  setUserFollowers = (followers: User[]) => {
    this.userFollowers = followers;
  }

  setUserContacts = (contacts: User[]) => {
    this.userContacts = contacts;
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

  loadFollowers = async () => {
    const followers = await getFollowers();
    this.setUserFollowers(followers ?? []);
  }

  loadContacts = async () => {
    const contacts = await getContacts();
    this.setUserContacts(contacts ?? []);
  }

  loadUser = async () => {
    this.setIsLoading(true);

    try {
      const savedUserToken = localStorage.getItem('user');
      if (!savedUserToken) return;

      this.setUser(await getCurrentUser());
      this.setUserResponses(await getCurrentUserResponses());

      await this.loadFollowings();
      await this.loadFollowers();
      await this.loadContacts();
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
      this.loadFollowings();
    } catch (error) {
      this.setError(error as AxiosError);
      throw this.error;
    } finally {
      this.setIsLoading(false);
    }

    return this.user;
  }

  logout = () => {
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new CurrentUserStore();
