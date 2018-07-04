import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  constructor(private userList: UserListService, private comm: CommService,
    private cred: CredentialsService, private formUtil: FormUtilitiesService) { }

  ngOnInit() {
  }

  private

  get newUser(): boolean { return !this.user; }

  maybeGetValue(name: string): any {
    return this.newUser ? "" : this.user[name];
  }

  showRoles(): boolean {
    return !this.newUser && this.user.role > Role.user;
  }

  getRoles(): string[] {
    let answer: string[] = [];
    const highest = this.userList.reader.role;
    for (let i = Role.user; i <= highest; i++)
      answer.push(Role[i]);
    return answer;
  }

  onSubmit(form: NgForm){
    let val = form.value;
    for (let prop in val)
      val[prop] = val[prop] || undefined;
    if (this.newUser){
      this.comm.post<RecUser>("users/", {user: val}).subscribe(
        resp => this.cred.logIn(resp, val.password),
        err => this.errorReceived(err)
      );
    } else {
      this.comm.patch<RecUser>(this.user, {user: val}).subscribe(resp => {
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
    //TODO
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

  log(x: any){console.log(x);}
}
