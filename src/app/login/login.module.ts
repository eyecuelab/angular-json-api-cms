import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ResetPasswordComponent,
    LogoutFormComponent,
    SetPasswordComponent
  ],
  providers: []
})
export class LoginModule { }
