import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { LoginComponent } from './login.component';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BlankComponent } from '../shared/blank.component';

import { SetPasswordResolver } from './set-password/set-password-resolver.service';

import { routeConfig, AuthGuard, AnonGuard } from './../core/route.config';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
        canActivate: [AnonGuard]
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sign-in/:token',
        component: SetPasswordComponent,
        resolve: { password: SetPasswordResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
  providers: [
    SetPasswordResolver
  ]
})
export class LoginRoutingModule { }
