import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action } from '../../../core/api/action';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() action: Action;
  @Input() field: string | number;
  @Input() placeholder: string;
  @Input() preset: string;
  @Input() floatPlaceholder = false;
  type: string;
  formControlName: string;
  inputType: string;

  constructor() {}

  ngOnInit() {
    if (typeof this.field === 'string') {
      this.field = this.action.fields.findIndex(field => field.name === this.field);
    }

    this.type = this.action.fields[this.field].type;
    this.formControlName = this.action.fields[this.field].name;
    this.placeholder = this.placeholder || this.formControlName;
  }

  get form(): FormGroup {
    return this.action.form;
  }

  get formError(): any {
    return this.action.formErrors[this.formControlName];
  }

  get touched(): boolean {
    return this.form.controls[this.formControlName].touched;
  }
}
