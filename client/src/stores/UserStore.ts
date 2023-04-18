import { getCurrentUser } from 'api';
import { getUser } from 'api/services/user.service';
import { makeAutoObservable } from 'mobx';
import { User } from 'models';

export class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  setUser(newUser: User | null) {
    this.user = newUser;
  }

  get isGuest() {
    return this.user === null;
  }

  loadUser = async () => {
    const savedUserToken = localStorage.getItem('user');

    if (!savedUserToken) return;

    const savedUser = await getCurrentUser();
    this.setUser(savedUser);
  }

  logout = () => {
    this.setUser(null);
    localStorage.removeItem('user');
  }
}

export default new UserStore();
