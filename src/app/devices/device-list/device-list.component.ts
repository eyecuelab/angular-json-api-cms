import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { SideDrawerComponent } from './../../shared/side-drawer/side-drawer.component';

import { WarningDialogComponent } from './../../shared';

import { ApiService } from './../../core/api/api.service';
import { Resource, ResourceList, SessionService } from './../../core';
import { Action } from './../../core/api/action';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})

export class DeviceListComponent implements OnInit {
  @ViewChild(SideDrawerComponent) sideDrawer: SideDrawerComponent;
  deviceList: ResourceList;
  devices: Resource[];

  constructor(private route: ActivatedRoute,
              protected api: ApiService,
              protected sessionService: SessionService,
              private _flashMessagesService: FlashMessagesService,
              protected dialog: MdDialog) { }

  ngOnInit() {
    this.route.data.subscribe((data: { devices: ResourceList }) => {
      this.deviceList = data.devices;
      this.devices = this.deviceList.data;
    });
  }

  deleteWarningDialog(item, message) {
    const config = new MdDialogConfig();
    const action = item.action('delete');
    config.data = { message: message };
    const dialogRef = this.dialog.open(WarningDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        action.confirmed = true;

        this.api.actionRequest(action, {})
                .subscribe(() => {
          const index = this.deviceList.data.findIndex(i => i.id === item.id);
          if (index > -1) { this.deviceList.data.splice(index, 1); }

          this._flashMessagesService.show('Record has been deleted successfully!', { timeout: 5000 });
        });

      }
    });
  }

  closeDrawer(component) {
    this.sideDrawer.close();
  }

  openDrawer(component) {
    this.sideDrawer.open();
  }
}
