import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';

import { Event } from 'models';
import { getEvent } from 'api';

export class EventStore {
  event: Event | null = null;
  isLoading: boolean = false;
  error: AxiosError | null = null;

  constructor(id: string) {
    makeAutoObservable(this);
    this.loadEvent(id);
  }

  setEvent(newEvent: Event | null) {
    this.event = newEvent;
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