import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CredentialsService } from '../../users/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private router: Router, private cred: CredentialsService) { }

  ngOnInit() {
    if (this.cred.loggedIn) this.router.navigate(["/user"]);
    this.cred.logEvent.subscribe(() => this.router.navigate(["/user"]));
  }

}
