import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/onErrorResumeNext';

import { plainToClass } from 'class-transformer';

import { Resource } from './resource';
import { ResourceList } from './resource-list';
import { Action } from './action';
import { ApiError } from './api_error';

import { ErrorHandlingService } from './../error-handling.service';

@Injectable()
export class ApiService {
  constructor (
    private http: Http,
    private errorHandling: ErrorHandlingService) {}

  actionRequest<T>(action: Action, input: any = {}, type?: { new (): T; }): Observable<T> {
    action.submitting = true;
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        action.field(key).value = input[key];
      }
    }

    const requestArgs: RequestOptionsArgs = { method: action.method };
    if (action.method === 'GET') {
      requestArgs.search = action.keyValues();
    } else {
      requestArgs.body = {
        data: {
          id: action.id,
          type: action.type,
          attributes: action.keyValues()
        }
      }
    }

    action.confirmed = false;

    const response = this.sendRequest(action.url, requestArgs, type);
    response.subscribe(null, issue => {
      if (!issue.warning) {
        action.handleApiErrors(issue);
        Observable.onErrorResumeNext(response);
      }
    });

    return response;
  }

  csvRequest(action: Action, input: any = {}) {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        action.field(key).value = input[key];
      }
    }
    const requestArgs: RequestOptionsArgs = {
      headers: this.requestHeaders(),
      responseType: ResponseContentType.Text
    };
    requestArgs.search = action.keyValues();
    return this.http
               .request(action.url, requestArgs)
               .map((res: any) => {
                 return new Blob([res._body], { type: 'text/csv' });
               })
               .share();
  }

  getRelation<T extends Resource>(
    resource: Resource,
    name: string,
    type?: { new (): T; }): Observable<T> {

    const rel = resource.relation(name);
    if (!rel) { return Observable.of(null); }

    const include = resource.includeFromRel(rel);
    if (include) { return Observable.of(include); }
    return this.get(rel.url, type);
  }

  get<T extends Resource>(
    url: string,
    params = {},
    type?: { new (): T; }): Observable<T> {

    return this.getRequest(url, params, type || Resource);
  }

  getList<T extends ResourceList>(
    url: string,
    params = {},
    type?: { new (): T; }): Observable<T> {

    return this.getRequest(url, params, type || ResourceList);
  }

  private getRequest<T>(url: string, params = {}, type: { new (): T; }): Observable<T> {
    const requestArgs: RequestOptionsArgs = { search: params };
    return this.sendRequest(url, requestArgs, type);
  }

  private sendRequest<T>(
    url:         string,
    requestArgs: RequestOptionsArgs,
    type?:       { new (): T; }): Observable<T> {

    requestArgs.headers = this.requestHeaders();
    return this.http
               .request(url, requestArgs)
               .map(this.extractDataTo(type || Resource))
               .catch((res, s) => this.responseIssue(res, s))
               .share();
  }

  private requestHeaders(): Headers {
    const headers = new Headers({ 'X-Requested-With': 'XMLHttpRequest',
                                  'Accept': 'application/vnd.api+json',
                                  'Content-Type': 'application/vnd.api+json' });
    const authBearer = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (authBearer) { headers.set('Authorization', authBearer); }
    return headers;
  }

  private extractDataTo<T>(klass) {
    return (res: Response) => {
      if (!res['_body']) {
        return null;
      }
      const body = res.json();
      if (body.warning) { return; }
      this.storeSessionAuth(res);
      return klass.fromObject(klass, body);
    };
  }

  private storeSessionAuth(res: Response) {
    const auth = res.headers.get('Authorization');
    if (!auth) return;
    // const storage = this.remember === true ? localStorage : sessionStorage;
    sessionStorage.setItem('token', auth);
  }

  private responseIssue(response: Response, s) {
    const body = response.json();
    if (body.warning) {
      return Observable.throw(body);
    }
    return this.responseError(response, s);
  }

  private responseError(error: Response | any, s) {
    const errors = new Array<ApiError>();

    const responseType = error.headers.get('content-type');
    if (responseType && /json/.test(responseType)) {
      error.json().errors.reduce((memo, err) => {
        memo.push(ApiError.fromPlainObject(err));
        return memo;
      }, errors);
    } else {
      errors.push(this.responseToError(error));
    }

    this.errorHandling.errors.unshift(...errors);

    return Observable.throw(errors);
  }

  private objectToErrors(json: any): Array<ApiError> {
    return json.reduce((memo, error) => {
      memo.push(ApiError.fromPlainObject(error));
      return memo;
    }, []);
  }

  private responseToError(error: Response): ApiError {
    const errorObject = {
     detail: `${error.status} - ${error.statusText || ''}`,
     status: error.status
   };
    return ApiError.fromPlainObject(errorObject);
  }
}
