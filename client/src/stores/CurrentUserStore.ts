import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getContacts, getCurrentUser, getCurrentUserInvites, getCurrentUserResponses, getFollowers, getFollowings, login, respondInvite } from 'api';
import { Invite, InviteResponse, Role, User } from 'models';
import { InviteRespondFormData, LoginFormData } from 'types';

export class CurrentUserStore {
  user: User | null = null;
  userInvites: Invite[] = [];
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

  setUserInvites(invites: Invite[]) {
    this.userInvites = invites;
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

  get userIsAdmin() {
    return this.user?.role === Role.ADMIN;
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

  loadInvites = async () => {
    const invites = await getCurrentUserInvites();
    this.setUserInvites(invites ?? []);
  }

  loadResponses = async () => {
    const responses = await getCurrentUserResponses();
    this.setUserResponses(responses ?? []);
  }

  get userIsCreatorInvites() {
    return this.userInvites.filter(invite => invite.creator._id === this.user?._id)
  }

  get userIsCompanionInvites() {
    return this.userInvites
      .filter(invite => invite.companions
        .map(companion => companion._id)
        .includes(this.user!._id))
  }

  get contactToInvites() {
    let map = new Map();

    this.userContacts.forEach(contact => map.set(contact, this.userInvites
      .filter(
        (invite) =>
          invite.creator._id === contact._id ||
          invite.companions
            .map((c) => c._id)
            .includes(contact._id),
      ))
    )

    return map;
  }

  loadUser = async () => {
    // if (this.user) return;

    this.setIsLoading(true);

    try {
      const savedUserToken = localStorage.getItem('user');
      if (!savedUserToken) return;

      this.setUser(await getCurrentUser());

      await Promise.all([this.loadResponses(), this.loadFollowings(), this.loadFollowers(), this.loadContacts(), this.loadInvites()])
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
      localStorage.setItem('user', user.token);
      await this.loadUser();
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
