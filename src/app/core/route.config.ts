import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SessionService } from './../core/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.sessionService.loggedIn) { return true; }

    this.router.navigate(['']);
    return false;
  }
}

@Injectable()
export class AnonGuard implements CanActivate {
  constructor(private sessionService: SessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.sessionService.loggedIn) { return true; }

    this.router.navigate(['/logout']);
    return false;
  }
}

export function routeConfig(path, component) {
  return {
    path: path,
    component: component
    // canActivate: [AuthGuard]
  };
}
