import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private comm: CommService, private cred: CredentialsService) {
    // cred.logChange.subscribe(val => {if (val) this.refreshList(cred.id)});
    cred.logEvent.subscribe( () => this.refreshList(cred.id) );
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

  @Output() selChange = new EventEmitter<User>();
}
