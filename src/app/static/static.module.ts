import { NgModule } from '@angular/core';

import { StaticRoutingModule } from './static-routing.module';
import { StaticComponent } from './static.component';
import { SharedModule } from '../shared/shared.module';

import { ContactUsComponent } from './pages/contact-us.component';

@NgModule({
  imports: [
    StaticRoutingModule,
    SharedModule
  ],
  declarations: [
    StaticComponent,
    ContactUsComponent
  ],
  providers: []
})
export class StaticModule { }
