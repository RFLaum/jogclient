import { Injectable } from '@angular/core';

import { CommService } from '../../communication/comm.service';
import { UserListService } from '../../users/user-list.service';
import { CredentialsService } from '../../users/credentials.service';
import { RecJog } from '../jog.model';

@Injectable({
  providedIn: 'root'
})
export class JogListService {
  jogs: RecJog[];
  needsUpdate: boolean = true;
  _pageNum: number = 1;
  numPages: number;
  startDate: string = "";
  endDate: string = "";

  get pageNum(): number { return this._pageNum; }
  set pageNum(newNum: number){
    if (newNum > this.numPages) newNum = this.numPages;
    if (newNum < 1) newNum = 1;
    if (newNum != this._pageNum){
      this._pageNum = newNum;
      this.refresh();
    }
  }

  //delete jog with given ID
  deleteID(id: number){
    this.jogs.splice(this.getLoc(id), 1);
    this.needsUpdate = true;
  }

  //change filter dates
  changeDates(newStart: string, newEnd: string) {
    if (newStart == this.startDate && newEnd == this.endDate) return;
    this.startDate = newStart;
    this.endDate = newEnd;
    this._pageNum = 1;
    this.refresh();
  }

  //refresh jog data
  refresh(){
    let params = {page_num: this.pageNum + ""};
    if (this.startDate) params["start_date"] = this.startDate;
    if (this.endDate) params["end_date"] = this.endDate;

    let countSuccess: number = 0;
    const count = () => {
      countSuccess++;
      if (countSuccess == 2) this.needsUpdate = false;
    };
    this.comm.get<number>([this.users.selected, "jogpages"], params).subscribe(
      succ => { this.numPages = succ; count();}
    );
    this.comm.get<RecJog[]>([this.users.selected, "jogs"], params).subscribe(
      succ => {this.jogs = succ; count();}
    );
  }

  maybeRefresh(){
    if (this.needsUpdate) this.refresh();
  }

  // get location of jog with given id. If no such jog is present, return -1
  private getLoc(id: number): number{
    return this.jogs.findIndex(x => x.id == id);
  }

  constructor(private comm: CommService, private users: UserListService,
    private cred: CredentialsService) {
    cred.logEvent.subscribe( inOrOut => { if(!inOrOut) this.jogs = []});
    users.selChange.subscribe(() => {
      this._pageNum = 1;
      this.needsUpdate = true;
      this.startDate = "";
      this.endDate = "";
    });
  }
}
