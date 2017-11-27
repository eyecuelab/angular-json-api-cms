import { Validators } from '@angular/forms';
import { Type } from 'class-transformer';

export class Option {
  label: string;
  value: string;
}

export class Field {
  name: string;
  type: string;
  value: string;
  required: boolean;
  disabled: boolean;
  pattern: string;
  max_length: number;
  min_length: number;
  @Type(() => Option)
  options?: Option[];
  min?: number;
  max?: number;
  default?: any;
  lostFocus: false;

  toControl() {
    const value = this.value || this.defaultValue;
    const validators = [];
    if (this.isRequired) { validators.push(Validators.required); }
    if (this.type === 'email') { validators.push(Validators.email); }
    if (this.pattern) { validators.push(Validators.pattern(this.pattern)); }
    if (this.max_length) { validators.push(Validators.maxLength(this.max_length)); }
    if (this.min_length) { validators.push(Validators.minLength(this.min_length)); }
    const disabled = this.disabled;
    return [ { value, disabled }, validators ];
  }

  get defaultValue(): any {
    if (this.name === 'page') { return 1; }
    if (this.name === 'sort') {
      return this.default || this.options[0].value;
    }
    return this.default || (this.type === 'boolean' ? false : '');
  }

  get currentValue(): any {
    return this.value || this.defaultValue;
  }

  get isRequired(): boolean {
    return this.required === true;
  }

  get range(): Array<number> {
    return Array(this.max).fill(0).map((x, i) => i + 1);
  }
}
