import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SessionService } from './../core/session.service';
import { Action } from './../core/api/action';

export class SingleActionComponent {
  form: FormGroup;
  action: Action;
  formErrors = {};

  constructor(
    protected fb: FormBuilder,
    protected sessionService: SessionService) {}

  protected initForm(action?: Action) {
    if (action) { this.action = action; }
    this.form = this.action.initForm(this.fb);
    this.formErrors = this.action.formErrors;
  }
}
