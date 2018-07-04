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


  logText(): string {
    return this.cred.loggedIn ? "Log Out" : "Log In";
  }
  logClick(){
    if (this.cred.loggedIn) this.cred.logOut();
    else this.toggleLogForm();
  }

  tryLogIn(f: NgForm){
    this.comm.post<RecUser>("login", f.value).subscribe(
      succ => this.cred.logIn(succ, f.value.password),
      err => console.log(err)
    );
  }

  test(f: NgForm): string {
    console.log(f);
    return "test";
  }
}
