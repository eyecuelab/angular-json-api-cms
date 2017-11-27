import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { ApiService } from './../../core/api/api.service';
import { ResourceList } from './../../core/api/resource-list';
import { SessionService } from './../../core/session.service';

@Injectable()
export class DeviceListResolver {
  constructor(
    private api: ApiService,
    private sessionService: SessionService,
    private router: Router  ) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ResourceList> {
    return this.api.getList(this.sessionService.instance.links.devices);
  }
}
