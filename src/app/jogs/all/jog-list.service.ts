import { Injectable } from '@angular/core';

import { CommService } from '../../communication/comm.service';
import { UserListService } from '../../users/user-list.service';
import { RecJog } from '../jog.model';

@Injectable({
  providedIn: 'root'
})
export class JogListService {
  jogs: RecJog[];
  needsUpdate: boolean = true;
  _pageNum: number = 1;
  numPages: number;

  get pageNum(): number { return this._pageNum; }
  set pageNum(newNum: number){
    if (newNum > this.numPages) newNum = this.numPages;
    if (newNum < 1) newNum = 1;
    this._pageNum = newNum;
  }

  deleteID(id: number){
    this.jogs.splice(this.getLoc(id), 1);
    this.needsUpdate = true;
  }

  refresh(){
    const params = {page_num: this.pageNum + ""};
    let countSuccess: number = 0;
    this.comm.get<RecJog[]>([this.users.selected, "jogs"], params).subscribe(
      succ => {this.jogs = succ; countSuccess++;}
    );
    this.comm.get<number>([this.users.selected, "jogpages"]).subscribe(
      succ => {this.numPages = succ; countSuccess++;}
    );
    if (countSuccess == 2) this.needsUpdate = false;
  }

  maybeRefresh(){ if (this.needsUpdate) this.refresh();}

  private getLoc(id: number): number{
    return this.jogs.findIndex(x => x.id == id);
  }

  constructor(private comm: CommService, private users: UserListService) {
    users.selChange.subscribe(() => {
        this._pageNum = 1;
        this.needsUpdate = true;
      });
  }
}
