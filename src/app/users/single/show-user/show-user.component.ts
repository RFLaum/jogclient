import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../user.model';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
