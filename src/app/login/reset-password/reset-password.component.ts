import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from './../../core/session.service';
import { ApiService } from './../../core/api/api.service';

import { SingleActionComponent } from './../../shared/single-action.component';

import { slideRight } from './../../shared/animations/slide-right.animation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  animations: [slideRight],
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends SingleActionComponent implements OnInit {
  routeState: string;
  @HostBinding('@slideRight') get slideRight() { return; }

  constructor(
    protected fb: FormBuilder,
    protected sessionService: SessionService,
    private api: ApiService,
    private router: Router) {

    super(fb, sessionService);
  }

  ngOnInit() {
    this.action = this.sessionService.instance.action('reset_password');
    this.initForm();
  }

  submit() {
    this.api
        .actionRequest(this.action, this.form.value)
        .subscribe(value => this.actionSuccess(value));
  }

  private actionSuccess(value) {
    this.routeState = 'confirm';
  }

  resetState() {
    this.routeState = null;
    this.form.reset();
  }
}
