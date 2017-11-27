import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {classToClass} from "class-transformer";
import { SessionService, ApiService, Resource, ResourceList, Action } from './../../core';

import { SingleActionComponent } from './../../shared/single-action.component';
import { dummyAnimation } from './../../shared/animations/dummy-animation.animation';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  animations: [dummyAnimation],
  styleUrls: ['./device-new.component.scss']
})
export class DeviceNewComponent extends SingleActionComponent implements OnInit {
  @HostBinding('@dummyAnimation') get dummyAnimation() { return; }
  // device: Resource;
  devicesList: ResourceList;

  constructor(
    protected sessionService: SessionService,
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected api: ApiService) {

    super(fb, sessionService);
  }

  ngOnInit() {
    this.action = classToClass(this.sessionService.instance.action('create_device'));
    this.initForm(this.action);

    this.route.parent.data.subscribe((data: { devices: ResourceList }) => {
      this.devicesList = data.devices;
    });
  }

  submit() {
    this.api.actionRequest(this.action, this.form.value).subscribe((item: Resource) => {
      this.devicesList.data.unshift(item);
      this.form = null;
      this.action = null;
      this.close();
    });
  }

  close() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
