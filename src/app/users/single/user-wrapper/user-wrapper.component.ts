import { Component, OnInit } from '@angular/core';

import { RoutingUtilitiesService } from '../../../misc/routing-utilities.service';
import { UserListService } from '../../user-list.service';
import { CredentialsService } from '../../credentials.service';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.css']
})
export class UserWrapperComponent implements OnInit {

  constructor(private routUtil: RoutingUtilitiesService,
    private users: UserListService, private cred: CredentialsService) {
    routUtil.maybeGoHome();
  }

  ngOnInit() {
  }

}
