import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { getEvents } from 'api';
import { Event } from 'models';
import { SearchEventFilters } from 'types';

export class EventListStore {
  events: Event[] = [];
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor(filters?: SearchEventFilters) {
    makeAutoObservable(this);
    this.getEvents(filters);
  }

  setEvents = (newEvents: Event[]) => {
    this.events = newEvents;
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }

  setError = (error: AxiosError) => {
    this.error = error;
  }

  getEvents = async (filters?: SearchEventFilters) => {
    this.setIsLoading(true);

    try {
      this.setEvents(await getEvents(filters));
    }
    catch (error) {
      this.setError(error as AxiosError);
    }
    finally {
      this.setIsLoading(false);
    }
  }
}


