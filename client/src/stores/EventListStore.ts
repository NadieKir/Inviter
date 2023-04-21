import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getEvents } from 'api';
import { Event } from 'models';

export class EventListStore {
  events: Event[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;
  
  constructor() {
    makeAutoObservable(this);
    this.getEvents();
  }

  setEvents(newEvents: Event[]) {
    this.events = newEvents;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: AxiosError) {
    this.error = error;
  }

  async getEvents() {
    this.setIsLoading(true);

    try {
      this.setEvents(await getEvents());
    }
    catch (error) {
      this.setError(error as AxiosError);
    } 
    finally {
      this.setIsLoading(false);
    }
  }
}


