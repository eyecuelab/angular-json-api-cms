import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService, Resource, ResourceList, SessionService } from './../../core';

@Injectable()
export class SetPasswordResolver {
  constructor(
    private api: ApiService,
    protected sessionService: SessionService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Resource> {

    const token = route.params['token'];
    const url = this.sessionService
                    .instance
                    .link('reset_password_token', { token });
    return this.api
               .get(url)
               .catch((err: any, s) => {
                 if (err[0].status !== 404) {
                   this.router.navigate(['/oops']);
                 }
                 return Observable.of(null);
               })
               .share();
  }
}
