import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

function getParameterByName(name: string) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) { return null; }
    if (!results[2]) { return ''; }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  constructor() {
    super();

    this.headers.set('X-Requested-With', 'XMLHttpRequest');
    this.headers.set('Accept', 'application/vnd.api+json');

    const cname = getParameterByName('cname');
    if (cname) { this.headers.set('X-Cname', cname); }

    const token = localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    if (!token) { return; }
    this.headers.set('Authorization', 'Bearer ' + token);
  }
}
export const requestOptionsProvider = { provide:  RequestOptions,
                                        useClass: DefaultRequestOptions };
