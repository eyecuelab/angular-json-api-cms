import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ApiService } from './../../core/api/api.service';
import { Resource } from './../../core/api/resource';
import { ResourceList } from './../../core/api/resource-list';
import { SessionService } from './../../core/session.service';

@Injectable()
export class DeviceResolver {
  constructor(
    private api: ApiService,
    private sessionService: SessionService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Resource> {
    return this.api.get(this.sessionService.instance.links.devices + '/' + route.params['id']).catch((err: any, s) => {
      if (err[0].notFound) {
        this._flashMessagesService.show('Device not found!', { timeout: 5000, cssClass: 'alert-error' });
        this.router.navigate(['/devices/list']);
      }
      return Observable.of(null);
    });
  }
}
