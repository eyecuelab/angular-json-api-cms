import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConfig, AuthGuard, AnonGuard } from './../core/route.config';

import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceNewComponent } from './device-new/device-new.component';

import { DeviceListResolver } from './device-list/device-list-resolver.service';
import { DeviceResolver } from './device-detail/device-resolver.service';

const routes: Routes = [
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DeviceListComponent,
        resolve: { devices: DeviceListResolver },
        children: [
          {
            path: 'new',
            component: DeviceNewComponent
          },
          {
            path: ':id',
            component: DeviceDetailComponent,
            resolve: {
              device: DeviceResolver
            }
          }
        ]
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
    DeviceListResolver,
    DeviceResolver
  ]
})
export class DevicesRoutingModule { }
