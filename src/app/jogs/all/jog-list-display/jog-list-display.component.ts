import { Component, OnInit } from '@angular/core';

import { JogListService } from '../jog-list.service';
import { UserListService } from '../../../users/user-list.service';
import { RoutingUtilitiesService } from '../../../misc/routing-utilities.service';
@Component({
  selector: 'app-jog-list-display',
  templateUrl: './jog-list-display.component.html',
  styleUrls: ['./jog-list-display.component.css']
})
export class JogListDisplayComponent implements OnInit {

  constructor(private jogsServ: JogListService,
    private userServ: UserListService,
    private routUtil: RoutingUtilitiesService) {
      routUtil.maybeGoHome();
    }

  ngOnInit() {
    this.jogsServ.maybeRefresh();
    this.userServ.selChange.subscribe(
      user => this.jogsServ.refresh()
    );
  }

}
