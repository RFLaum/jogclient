import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders}
  from '@angular/common/http';
import {Observable} from 'rxjs';

import {CredentialsService} from '../users/credentials.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cred: CredentialsService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.cred.loggedIn){
      return next.handle(req);
    }
    const copiedReq = req.clone({
      headers: req.headers.set("Authorization", this.cred.getAuth())
    });
    return next.handle(copiedReq);
  }
}
