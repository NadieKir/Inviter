import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getAnotherUserInvites, getAnotherUserContacts, getAnotherUserFollowers, getAnotherUserFollowings, getUser } from 'api';
import { Invite, User } from 'models';

export class UserStore {
  user: User | null = null;
  userInvites: Invite[] = [];
  userFollowings: User[] = [];
  userFollowers: User[] = [];
  userContacts: User[] = [];
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

  setError(error: AxiosError) {
    this.error = error;
  }

  loadFollowings = async (id: string) => {
    const followings = await getAnotherUserFollowings(id);
    this.setUserFollowings(followings ?? []);
  }

  loadFollowers = async (id: string) => {
    const followers = await getAnotherUserFollowers(id);
    this.setUserFollowers(followers ?? []);
  }

  loadContacts = async (id: string) => {
    const contacts = await getAnotherUserContacts(id);
    this.setUserContacts(contacts ?? []);
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
 
      await Promise.all([this.loadFollowings(user._id), this.loadFollowers(user._id), this.loadContacts(user._id)])
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