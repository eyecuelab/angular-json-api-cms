import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService, ApiService, Resource, ResourceList } from './../../core';

import { SingleActionComponent } from './../../shared/single-action.component';
import { dummyAnimation } from './../../shared/animations/dummy-animation.animation';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-detail.component.html',
  animations: [dummyAnimation],
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent extends SingleActionComponent implements OnInit {
  @HostBinding('@dummyAnimation') get dummyAnimation() { return; }
  device: Resource;
  devicesList: ResourceList;

  constructor(
    protected sessionService: SessionService,
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected api: ApiService) {

    super(fb, sessionService);
  }

  // get deviceId(): string {
  //   return this.route.snapshot.params.id;
  // }

  ngOnInit() {
    this.route.parent.data.subscribe((data: { devices: ResourceList }) => {
      this.devicesList = data.devices;
    });

    this.route.data.subscribe((data: { device: Resource }) => {
      this.device = data.device;
      this.action = this.device.action('update');
      this.initForm(this.action);
    });
  }

  // updateList(list, params) {
  //   this.api
  //       .getList(list.meta.action('index').url, params)
  //       .subscribe((newList: ResourceList) => {
  //         Object.assign(list, newList);
  //       });
  // }

  submit() {
    // const data = { data: { attributes: this.form.value } };
    this.api.actionRequest(this.action, this.form.value).subscribe((device: Resource) => {
      this.device = device;

      const index = this.devicesList.data.findIndex(d => d.id === device.id);
      if (index > -1) { this.devicesList.data.splice(index, 1, device); }

      this.close();
    });
  }

  close() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
