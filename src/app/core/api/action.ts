import { Field } from './field';
import { ApiError } from './api_error';

import { Type } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class Action {
  name: string;
  @Type(() => Field)
  fields: Field[] = [];
  method: string;
  url: string;
  id: string;
  type: string;
  confirmed = false;

  form: FormGroup;
  formErrors = {};
  submitting = false;

  get validationMessages(): any {
    return {
      'required': (field) => `${field[0].toUpperCase() + field.slice(1)} is required.`,
      'email': (field) => 'Must be a valid email address.',
      'pattern': (field) => `Must be a valid ${field}.`,
      'minlength': (field) => `Must be at least ${this.field(field).min_length} characters long.`,
      'maxlength': (field) => `Cannot be more than ${this.field(field).max_length} characters long.`
    }
  };

  field(name: string): Field {
    return this.fields.find(a => a.name === name);
  }

  fieldControls() {
    return this.fields.reduce((memo, field) => {
      memo[field.name] = field.toControl();
      return memo;
    }, {});
  }

  keyValues() {
    const params = this.fields.reduce((memo, field) => {
      if (typeof field.value !== 'undefined' && field.value !== null) {
        memo[field.name] = field.value;
      }
      return memo;
    }, {});
    if (this.confirmed) {
      params['confirm'] = true;
    }
    return params;
  }

  inputParams(input: any): any {
    return this.fields.reduce((memo, field) => {
      if (field.name in input) {
        field.value = input[field.name];
      }
      if (field.currentValue !== field.defaultValue) {
        memo[field.name] = field.value;
      }
      return memo;
    }, {});
  }

  initForm(fb: FormBuilder): FormGroup {
    this.form = fb.group(this.fieldControls());
    this.form.valueChanges.subscribe(data => this.formChanged(data));
    this.formChanged();
    return this.form;
  }

  handleSuccess(value: any) {
    // console.log('success!');
  }

  handleApiErrors(errors: ApiError[]) {
    this.submitting = false;
    for (const error of errors) {
      this.handleApiError(error);
    }
    return errors;
  }

  private handleApiError(error: ApiError) {
    if (error.param) {
      this.formErrors[error.param] = error.detail;
    }
  }

  formChanged(data?: any) {
    for (const field in this.form.value) {
      if (this.form.value.hasOwnProperty(field)) {
        if (!this.field(field).lostFocus) { return; }
        this.formErrors[field] = '';
        const control = this.form.get(field);
        if (control && control.dirty && !control.valid) {
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = this.getValidationMessage(field, key);
            }
          }
        }
      }
    }
  }

  private getValidationMessage(field: string, error: string): string {
    const value = this.validationMessages[error];
    if (typeof value === 'function') {
      return value(field);
    } else if (typeof value === 'string') {
      return value;
    } else {
      return `${field}: ${error}`;
    }
  }
}
