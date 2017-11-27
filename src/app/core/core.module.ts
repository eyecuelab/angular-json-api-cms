import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';

import { ErrorHandlingService } from './error-handling.service';
import { SessionService } from './session.service';
import { JobService } from './job.service';

import { AuthGuard, AnonGuard } from './route.config';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { requestOptionsProvider } from './default-request-options.service';
import { ApiService } from './api/api.service';
import { AuthHttpService } from './auth-http.service';
import { ProviderService } from './provider.service';

import { initConfig } from './init.provider';

@NgModule({
  imports: [
    HttpModule,
    CommonModule // we use ngFor
  ],
  providers: [
    ErrorHandlingService,
    SessionService,
    JobService,
    initConfig(),
    AuthGuard,
    AnonGuard,
    // requestOptionsProvider,
    ApiService,
    // { provide: Http, useClass: AuthHttpService }
    ProviderService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
