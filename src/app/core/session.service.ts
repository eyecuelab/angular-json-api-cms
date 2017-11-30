import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { ApiService } from './api/api.service';
import { Action } from './api/action';
import { Resource } from './api/resource';
import { Session } from './api/session';

@Injectable()
export class SessionService {
  instance: Session;
  remember: boolean;
  apiUrl: string

  get loginAction(): Action {
    return this.instance.action('login');
  }

  get logoutAction(): Action {
    return this.instance.action('logout');
  }

  constructor (private api: ApiService) {
    this.apiUrl = window['api_url'] || 'http://localhost:3003/session';
  }

  get loggedIn(): boolean {
    return this.instance.loggedIn;
  }

  get agreement(): Resource {
    return this.instance.applicationAgreement;
  }

  load(): Observable<Session> {
    const response = this.api.get(this.apiUrl, {}, Session);
    response.subscribe(
      value => {
        this.instance = value;
      },
      err => {
        this.clearSession();
        if (err[0] && err[0].notFound) {
          document.getElementById('portal_loading')
                  .setAttribute('src', 'https://s3-us-west-1.amazonaws.com/cms.com/static/404.png');
        }
        return err;
      });
    return response;
  }

  login(input): Observable<Session> {
    this.remember = input.remember;
    const response = this.api.actionRequest(this.loginAction, input, Session);
    response.subscribe(
      value => {
        this.instance = value;
      },
      error => Observable.throw);
    return response;
  }

  logout(): Observable<Session> {
    const response = this.api.actionRequest(this.logoutAction, {}, Session);
    response.subscribe(
      value => {
        this.clearSession();
        this.instance = value;
      },
      error => Observable.throw);
    return response;
  }

  // private storeSession(value: Session) {
  //   const storage = this.remember === true ? localStorage : sessionStorage;
  //   storage.setItem('token', value.id);
  // }

  private clearSession() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  // private reset(value: Session) {
  //   this.clearSession();
  //   this.instance = value;
  //   // if (value.loggedIn) {
  //   //   this.storeSession(value);
  //   // }
  //   return value;
  // }
}
