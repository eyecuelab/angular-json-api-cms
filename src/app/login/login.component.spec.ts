import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedTestingModule } from '../shared/testing/shared.module';

import { SessionService, ProviderService, ApiService } from '../core';
import { FakeSessionService, FakeApiService, ActivatedRouteStub,
         FakeProviderService } from '../core/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

import { RouterLinkStubDirective } from '../../testing/router-stubs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const ars: ActivatedRouteStub = new ActivatedRouteStub();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginRoutingModule,
        SharedTestingModule
      ],
      declarations: [
        LoginComponent,
        LoginFormComponent,
        ResetPasswordComponent,
        LogoutFormComponent,
        SetPasswordComponent,
        RouterLinkStubDirective
      ],
      providers: [ { provide: ActivatedRouteStub, useClass: ars }, { provide: ProviderService, useValue: FakeProviderService } ]
    })
    .compileComponents();

  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const providerService = TestBed.get(ProviderService);
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should show login form', () => {
    expect(component.showLogin).toBeFalsy;
    component.activeRoute = 'sign-in';
    expect(component.showLogin).toBeTruthy;
  });
});
