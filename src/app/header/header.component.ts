import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CredentialsService } from '../users/credentials.service';
import { UserListService } from '../users/user-list.service';
import { CommService } from '../communication/comm.service';
import { FormUtilitiesService } from '../misc/form-utilities.service';

import { RecUser } from '../users/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private showLogForm: boolean = false;
  private showRegForm: boolean = false;

  constructor(private cred: CredentialsService,
    private users: UserListService, private comm: CommService,
    private formUtil: FormUtilitiesService) { }

  ngOnInit() {
  }

  toggleLogForm(){
    this.showRegForm = false;
    this.showLogForm = !this.showLogForm;
  }
  toggleRegForm(){
    this.showLogForm = false;
    this.showRegForm = !this.showRegForm;
  }

  // text to display for the login/logout link
  logText(): string {
    return this.cred.loggedIn ? "Log Out" : "Log In";
  }
  // logs in or out when log link clicked
  logClick(){
    if (this.cred.loggedIn) this.cred.logOut();
    else this.toggleLogForm();
  }

  tryLogIn(f: NgForm){
    this.comm.post<RecUser>("login", f.value).subscribe(
      succ => {
        this.cred.logIn(succ, f.value.password);
        this.hideForms();
      },
      err => alert(err.status == 401 ? "Invalid username or password" : "Unknown Error")
    );
  }

  hideForms() {
    this.showRegForm = false;
    this.showLogForm = false;
  }

  //check if we can see the viewed user's jog records
  checkCanView(): boolean {
    // return this.users.reader.canViewJogs(this.users.selected);
    return this.users.canViewJogs();
  }
}
