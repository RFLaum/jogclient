import { Injectable } from '@angular/core';

import { Week } from './week.model';
import { User } from '../users/user.model';
import { CommService } from '../communication/comm.service'
import { UserListService } from '../users/user-list.service';
import { CredentialsService } from '../users/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class WeekListService {
  weeks: Week[];
  _pageNum: number = 1;
  numPages: number;

  constructor(private comm: CommService, private users: UserListService,
    private cred: CredentialsService) {

    // when log out, clear data
    cred.logEvent.subscribe(inOrOut => {
      if (!inOrOut) this.weeks = [];
    });
    users.selChange.subscribe( user => this.onUserChange(user) );
    this.onUserChange(users.selected);
  }

  onUserChange(user: User){
    if (!user) return;
    this._pageNum = 1;
    this.comm.get<number>([user, "weekcount"]).subscribe(
      succ => this.numPages = Math.ceil(succ/20)
    );
    this.refreshList();
  }

  get pageNum(): number { return this._pageNum; }
  set pageNum(newNum: number){
    if (newNum > this.numPages) newNum = this.numPages;
    if (newNum < 1) newNum = 1;
    if (newNum != this._pageNum){
      this._pageNum = newNum;
      this.refreshList();
    }
  }

  refreshList(){
    const params = {page_num: this.pageNum + ""};
    const user = this.users.selected;
    this.comm.get<Week[]>([user, "weeklist"], params).subscribe(
      succ => this.weeks = succ
    );
  }
}
