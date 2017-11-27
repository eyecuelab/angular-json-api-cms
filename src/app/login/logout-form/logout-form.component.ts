import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from './../../core/session.service';
import { Resource } from './../../core/api/resource';

import { SingleActionComponent } from './../../shared/single-action.component';

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.scss']
})
export class LogoutFormComponent extends SingleActionComponent implements OnInit {
  user: Resource;

  constructor(
    protected fb: FormBuilder,
    protected sessionService: SessionService,
    private router: Router) {

    super(fb, sessionService);
  }

  ngOnInit() {
    this.initForm(this.sessionService.logoutAction);
    this.user = this.sessionService.instance.user;
  }

  get isHomeAvailable(): boolean {
    return true;
  }

  submit() {
    this.sessionService
        .logout()
        .subscribe(value => this.actionSuccess(value));
  }

  private actionSuccess(value) {
    this.router.navigate(['/']);
  }
}
