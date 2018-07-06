//dropdown to choose what user to view

import { Component, OnInit } from '@angular/core';

import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  constructor(private userList: UserListService) { }

  ngOnInit() {
  }

}
