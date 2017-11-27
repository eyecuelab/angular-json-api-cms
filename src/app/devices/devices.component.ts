import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';

import { Resource, ResourceList, SessionService } from '../core';

import { Tab, SideDrawerComponent } from './../shared';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  devices: ResourceList;
  @ViewChild(DeviceListComponent) deviceList: DeviceListComponent;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  get user(): Resource {
    return this.sessionService.instance.user;
  }

  get tabs() {
    const items = [{
      label: 'Devices',
      link: '/devices/list',
      active: () => { return this.router.url.includes('/devices/list'); }
    }];

    return items;
  }
}
