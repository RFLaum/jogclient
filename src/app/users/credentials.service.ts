import { Injectable, EventEmitter } from '@angular/core';

import { RecUser, User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  id: number;
  username: string;
  password: string;
  role: string;
  loggedIn: boolean = false;
  logEvent = new EventEmitter<boolean>();

  logIn(user: RecUser, password: string){
    this.id = user.id;
    this.username = user.username;
    this.password = password;
    this.role = user.role;
    this.loggedIn = true;
    this.logEvent.emit(true);
  }
  logOut() {
    this.loggedIn = false;
    this.logEvent.emit(false);
  }

  getAuth():string {
    return "Basic " + btoa(this.username + ":" + this.password);
  }

  userObj(): User { return new User(this); }

  constructor() { }
}
