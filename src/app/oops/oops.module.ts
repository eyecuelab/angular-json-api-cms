import { NgModule } from '@angular/core';

import { OopsRoutingModule } from './oops-routing.module';
import { OopsComponent } from './oops.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    OopsRoutingModule,
    SharedModule
  ],
  declarations: [
    OopsComponent
  ],
  providers: []
})
export class OopsModule { }
