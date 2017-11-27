import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../shared.module';
import { RouterStub } from '../../../testing/router-stubs';
import { SessionService, ProviderService, ApiService } from '../../core';
import { FakeSessionService, FakeApiService, ActivatedRouteStub,
         FakeProviderService } from '../../core/testing';


@NgModule({
  imports: [
    RouterTestingModule,
    SharedModule
  ],
  providers: [ { provide: SessionService, useClass: FakeSessionService },
               { provide: ProviderService, useClass: FakeProviderService},
               { provide: Router, useClass: RouterStub },
               { provide: ActivatedRoute, useValue: ActivatedRouteStub },
               { provide: ApiService, useValue: FakeApiService } ],
  exports: [
    SharedModule
  ],
  declarations: []
})

export class SharedTestingModule {
  constructor() {}
}
