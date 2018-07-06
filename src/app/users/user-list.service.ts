import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CommService } from '../communication/comm.service';
import { CredentialsService } from './credentials.service';
import { Role, User, RecUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  users: User[] = [];
  selected: User;
  get reader(): User {
    return this.getUserWithID(this.cred.id) || new User(this.cred);
  }

  constructor(private comm: CommService, private cred: CredentialsService,
    private router: Router) {
    cred.logEvent.subscribe( inOrOut => {
      if (inOrOut) this.refreshList(cred.id);
      else {
        this.users = [];
        this.selected = null;
      }
    });
  }

  refreshList(chosenID: number){
    this.comm.get<RecUser[]>("users").subscribe(
      (succ) => {
        this.fillList(succ);
        this.selectedID = chosenID;
      },
      (err) => alert("Could not get user list")
    );
  }

  fillList(newUsers: RecUser[]){
    this.users = newUsers.map(user => new User(user));
  }

  getUserWithID(id: number): User{
    return this.users.find(user => user.id == id)
  }

  get selectedID(): number {
    return this.selected.id;
  }
  set selectedID(id: number) {
    if (this.selected && id == this.selectedID) return;
    const res = this.getUserWithID(id);
    if (res === undefined) return;
    this.selected = res;
    this.selChange.emit(res);
  }

  showMany(): boolean {
    return this.cred.loggedIn && this.users.length > 1;
  }

  canViewJogs(): boolean {
    if (!this.cred.loggedIn) return false;
    if (this.selected) return this.reader.canViewJogs(this.selected);
    return false;
  }

  maybeRedirect(){
    let currentPath = this.router.url;
    let destPath: string;
    if (!this.cred.loggedIn) destPath = "/";
    else if ( currentPath == "/" || !this.canViewJogs() ) destPath = "/user";
    else return;
    if (destPath != currentPath) this.router.navigate([destPath]);
  }

  @Output() selChange = new EventEmitter<User>();
}
