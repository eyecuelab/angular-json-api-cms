import { Component, OnInit, HostBinding, DebugElement } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from './../../core/session.service';

import { SingleActionComponent } from './../../shared/single-action.component';

import { slideLeft } from './../../shared/animations/slide-left.animation';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  animations: [slideLeft],
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends SingleActionComponent implements OnInit {
  @HostBinding('@slideLeft') get slideLeft() { return; }

  constructor(
    protected fb: FormBuilder,
    protected sessionService: SessionService,
    private router: Router) {

    super(fb, sessionService);
  }

  ngOnInit() {
    this.initForm(this.sessionService.loginAction);
  }

  submit() {
    this.sessionService
        .login(this.form.value)
        .subscribe(value => this.actionSuccess(value));
  }

  private actionSuccess(value) {
    this.form.reset();
    let path = '/logout';
    this.router.navigate([path]);
  }
}
