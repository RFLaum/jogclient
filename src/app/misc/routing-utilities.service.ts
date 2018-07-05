import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CredentialsService } from '../users/credentials.service';
@Injectable({
  providedIn: 'root'
})
export class RoutingUtilitiesService {

  constructor(private cred: CredentialsService, private router: Router) { }

  maybeGoHome(){
    if (!this.cred.loggedIn) this.router.navigate(["/"]);
  }
}
