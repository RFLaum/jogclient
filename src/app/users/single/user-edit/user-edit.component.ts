import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

import { User, Role, RecUser } from '../../user.model';
import { UserListService } from '../../user-list.service';
import { MaybeRequiredDirective } from './maybe-required.directive';
import { CommService } from '../../../communication/comm.service';
import { CredentialsService } from '../../credentials.service';
import { FormUtilitiesService } from '../../../misc/form-utilities.service'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;
  @Output() doneEditing = new EventEmitter();
  @ViewChild("f") form: NgForm;

  constructor(private userList: UserListService, private comm: CommService,
    private cred: CredentialsService, private formUtil: FormUtilitiesService) { }

  ngOnInit() {
  }

  private

  // check whether this is a new user or whether we're editing an existing one
  get newUser(): boolean { return !this.user; }

  // return empty string if this is a new user, or value from existing user if
  // there is one
  maybeGetValue(name: string): any {
    return this.newUser ? "" : this.user[name];
  }

  showRoles(): boolean {
    return !this.newUser && this.user.role > Role.user;
  }

  //get roles we can assign to. No one can promote above their own role
  getRoles(): string[] {
    let answer: string[] = [];
    const highest = this.userList.reader.role;
    for (let i = Role.user; i <= highest; i++)
      answer.push(Role[i]);
    return answer;
  }

  onSubmit(){
    let val = this.formUtil.removeBlank(this.form);
    if (this.newUser){
      this.comm.post<RecUser>("users/", {user: val}).subscribe(
        resp => {
          this.cred.logIn(resp, val.password);
          this.doneEditing.emit();
        },
        err => this.errorReceived(err)
      );
    } else {
      this.comm.patch<RecUser>(this.user, {user: val}).subscribe(resp => {
        //if user edited themself, update credentials
        if (resp.id == this.cred.id) {
          if (val.username) this.cred.username = val.username;
          if (val.password) this.cred.password = val.password;
        }
        this.userList.refreshList(resp.id);
        this.doneEditing.emit();
      }, err => this.errorReceived(err));
    }
  }

  errorReceived(error: any){
    this.formUtil.addChildErrors(this.form, error.error);
  }

  onDelete(){
    if (!confirm("Are you sure you want to delete this user?"))
      return;
    this.comm.delete(this.user).subscribe(
      () => {
        if (this.user.id == this.cred.id) {this.cred.logOut();} else
          this.userList.refreshList(this.user.id);
      },
      err => this.errorReceived(err)
    );
  }
}
