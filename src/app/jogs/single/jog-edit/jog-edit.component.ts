//jog edit form

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { CommService } from '../../../communication/comm.service';
import { JogListService } from '../../all/jog-list.service';
import { UserListService } from '../../../users/user-list.service';
import { RecJog } from '../../jog.model';

@Component({
  selector: 'app-jog-edit',
  templateUrl: './jog-edit.component.html',
  styleUrls: ['./jog-edit.component.css']
})
export class JogEditComponent implements OnInit {
  @Input() jog: RecJog;
  @Output() doneEditing = new EventEmitter();

  // check if we're creating a new jog or editing an existing one
  get newJog(): boolean { return !this.jog; }

  constructor(private comm: CommService,
    private jogList: JogListService,
    private userList: UserListService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    let val = form.value;
    //remove empty fields from the data we're going to send
    for (let prop in val)
      val[prop] = val[prop] || undefined;

    let obs: Observable<RecJog>;
    const isNew = this.newJog;
    if (isNew){
      obs = this.comm.post<RecJog>([this.userList.selected, "jogs"], val);
    } else {
      obs = this.comm.patch<RecJog>(this.jog, val)
    }
    obs.subscribe(
      succ => {
        this.jogList.needsUpdate = true;
        if (!isNew)
          for (let prop of ["time", "date", "distance", "speed"])
            this.jog[prop] = succ[prop];
        this.doneEditing.emit();
      },
      err => this.errorReceived(err)
    );
  }

  errorReceived(error: any){
    //TODO
  }

  onDelete(){
    if (this.newJog || !confirm("Are you sure you want to delete this record?"))
      return;
    this.comm.delete(this.jog).subscribe(
      () => this.jogList.deleteID(this.jog.id),
      err => this.errorReceived(err)
    );
  }

}
