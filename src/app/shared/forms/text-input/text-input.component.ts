import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Action } from '../../../core/api/action';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @Input() action: Action;
  @Input() field: string | number;
  @Input() placeholder: string;
  @Input() floatPlaceholder = false;
  @Input() autofocus = false;
  @Input() type: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() pattern: string;
  formControlName: string;
  inputType: string;

  constructor(private renderer: Renderer) {}

  ngOnInit() {
    if (typeof this.field === 'string') {
      this.field = this.action.fields.findIndex(field => field.name === this.field);
    }

    this.formControlName = this.action.fields[this.field].name;
    this.inputType = this.type || this.action.fields[this.field].type;
    this.minLength = this.minLength || this.action.fields[this.field].min_length;
    this.maxLength = this.maxLength || this.action.fields[this.field].max_length;

    if (this.placeholder !== '') {
      this.placeholder = this.placeholder || this.formControlName;
    }

    if (this.autofocus !== false) {
      this.renderer.invokeElementMethod(this.input.nativeElement,
      'focus');
    }
  }

  onBlur(): void {
    this.action.fields[this.field].lostFocus = true;
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
