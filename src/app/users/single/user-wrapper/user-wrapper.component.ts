import { Component, OnInit } from '@angular/core';

import { UserListService } from '../../user-list.service';
import { CredentialsService } from '../../credentials.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.css']
})
export class UserWrapperComponent implements OnInit {
  private _editMode: boolean = false;
  private get editMode(): boolean {
    if (!this.users.selected) this._editMode = false;
    return this._editMode;
  }
  private set editMode(newVal: boolean){
    this._editMode = this.users.selected ? newVal : false;
  }

  constructor(private cred: CredentialsService,
    private users: UserListService) {
    users.maybeRedirect();
  }

  ngOnInit() {
  }

}
