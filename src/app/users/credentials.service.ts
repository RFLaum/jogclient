import { Injectable } from '@angular/core';

import { RecUser } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  id: number;
  username: string;
  password: string;
  loggedIn: boolean = false;

  logIn(user: RecUser, password: string){
    this.id = user.id;
    this.username = user.username;
    this.password = password;
    this.loggedIn = true;
  }
  logOut() {this.loggedIn = false;}

  getAuth():string {
    return "Basic " + btoa(this.username + ":" + this.password);
  }

  constructor() { }
}
