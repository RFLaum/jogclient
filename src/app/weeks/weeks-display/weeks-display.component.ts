import { Component, OnInit } from '@angular/core';

// import { RoutingUtilitiesService } from '../../misc/routing-utilities.service'
import { WeekListService } from '../week-list.service';
import { UserListService } from '../../users/user-list.service';
@Component({
  selector: 'app-weeks-display',
  templateUrl: './weeks-display.component.html',
  styleUrls: ['./weeks-display.component.css']
})
export class WeeksDisplayComponent implements OnInit {

  constructor(private weeks: WeekListService, users: UserListService) {
    users.maybeRedirect();
  }

  ngOnInit() {
  }

}
