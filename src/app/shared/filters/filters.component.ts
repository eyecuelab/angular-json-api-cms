import { Component, OnInit, DoCheck, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Action, Field } from './../../core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, DoCheck {
  static readonly specialFields = ['page', 'search', 'sort'];
  @Input() action: Action;
  @Input() include: Array<string>;
  @Input() searchDescription: string;
  @Input() resetOnFieldChange: string;
  @Output() toggleFilters = new EventEmitter<any>();
  @Output() changeFilters = new EventEmitter<any>();
  @HostBinding('class.is-open') isOpen = null;
  form: FormGroup;
  oldResetFieldValue: string;
  currentlySelected: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}

  get resetField(): Field {
    return this.action.field(this.resetOnFieldChange);
  }

  toggleLaterStages() {
    this.currentlySelected = null;
  }

  changeSelected(value) {
    this.currentlySelected = value;
  }

  ngOnInit() {
    this.form = this.action.initForm(this.fb);
  }

  ngDoCheck() {
    if (this.resetField && this.resetField.value !== this.oldResetFieldValue) {
      this.form = this.action.initForm(this.fb);
      this.oldResetFieldValue = this.action.field(this.resetOnFieldChange).value;
    }
  }

  submit() {
    const input = Object.assign({}, this.form.value, { page: 1 });
    const params = this.action.inputParams(input);
    this.changeFilters.emit(params);
    this.close();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  get sort(): Field {
    return this.action.field('sort');
  }

  get filters(): Field[] {
    return this.action.fields.filter(f => this.includeField(f));
  }

  private includeField(field: Field): boolean {
    return !this.specialField(field.name) && this.whiteListed(field.name);
  }

  private specialField(name: string): boolean {
    return FiltersComponent.specialFields.indexOf(name) !== -1;
  }

  private whiteListed(name: string): boolean {
    return !this.include || this.include.length === 0 ||
      this.include.indexOf(name) !== -1;
  }
}
