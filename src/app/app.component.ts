import { Component } from '@angular/core';

import { UserListService } from './users/user-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jog Management';

  constructor(private users: UserListService){
  }
}
