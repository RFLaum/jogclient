import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../users/user.model';
import { RecJog } from '../jogs/jog.model';
import { CredentialsService } from '../users/credentials.service';

// destinations; used to find the destination path for the url
type InnerDest = User|string|RecJog;
type Dest = InnerDest|InnerDest[];
type MyParams = HttpParams | { [param: string]: string | string[]; };

// handles communication
@Injectable({
  providedIn: 'root'
})
export class CommService {

  constructor(private client: HttpClient, private cred: CredentialsService) { }

  get<T>(path: Dest, params?: MyParams): Observable<T> {
    const url = this.makeUrl(path);
    return params ? this.client.get<T>(url, {params: params}) :
                    this.client.get<T>(url);
  }
  patch<T>(path: Dest, body: any|null): Observable<T> {
    const url = this.makeUrl(path);
    return this.client.patch<T>(url, body);
  }
  post<T>(path: Dest, body: any|null): Observable<T> {
    const url = this.makeUrl(path);
    return this.client.post<T>(url, body);
  }
  delete(path: Dest): Observable<any> {
    const url = this.makeUrl(path);
    return this.client.delete(url);
  }

  private

// no need to make this static, since we'll only ever have one instance of
// this class
  readonly domain: string = "http://localhost:3000/"

// finds the correct url
  makeUrl(val: Dest): string {
    const makeUrlInner = (x: any) => {
      if (x instanceof Array)
        return x.map(section => makeUrlInner(section))
                .reduce((acc, curr) => acc + "/" + curr);
      if (x instanceof User)
        return "users/" + x.id;
      if (x instanceof RecJog ) return "jogs/" + x.id;
      return x;
    };
    return this.domain + makeUrlInner(val);
  }
}
