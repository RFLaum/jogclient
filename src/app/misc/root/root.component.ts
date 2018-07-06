import { Component, OnInit } from '@angular/core';

import { CredentialsService } from '../../users/credentials.service';
import { UserListService } from '../../users/user-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(users: UserListService, cred: CredentialsService) {
    users.maybeRedirect();
    cred.logEvent.subscribe( () => users.maybeRedirect());
  }

  ngOnInit() {
  }

}
