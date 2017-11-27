import { NgModule } from '@angular/core';

import { DevicesRoutingModule } from './devices-routing.module';

import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceNewComponent } from './device-new/device-new.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    DevicesRoutingModule,
    SharedModule
  ],
  declarations: [
    DevicesComponent,
    DeviceListComponent,
    DeviceDetailComponent,
    DeviceNewComponent
  ]
})
export class DevicesModule {
  constructor() {}
}
