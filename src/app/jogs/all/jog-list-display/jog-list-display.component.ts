// display list of jog records

import { Component, OnInit } from '@angular/core';

import { JogListService } from '../jog-list.service';
import { UserListService } from '../../../users/user-list.service';

@Component({
  selector: 'app-jog-list-display',
  templateUrl: './jog-list-display.component.html',
  styleUrls: ['./jog-list-display.component.css']
})
export class JogListDisplayComponent implements OnInit {

  constructor(private jogsServ: JogListService,
    private userServ: UserListService) {
      // if we're not logged in, go to home page
      userServ.maybeRedirect();
    }

  ngOnInit() {
    this.jogsServ.maybeRefresh();
    //when selected user changes, refresh jog list
    this.userServ.selChange.subscribe( user => this.jogsServ.refresh() );
  }

}
