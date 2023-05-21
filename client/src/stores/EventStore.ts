import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { Event, Invite } from 'models';
import { getEvent, getEventInvites } from 'api';

export class EventStore {
  event: Event | null = null;
  isLoading: boolean = false;
  error: AxiosError | null = null;
  eventInvites?: Invite[] | null = null;

  constructor(id: string) {
    makeAutoObservable(this);
    this.loadEvent(id);
  }

  setEvent(newEvent: Event | null) {
    this.event = newEvent;
  }

  setEventInvites(invites: Invite[]) {
    this.eventInvites = invites;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  loadEvent = async (id: string) => {
    this.setIsLoading(true);

    try {
      this.setEvent(await getEvent(id));
      this.setEventInvites(await getEventInvites(id));
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