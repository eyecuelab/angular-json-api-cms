import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Action, Field } from './../../core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {
  @Input() action: Action;
  @Output() changePage = new EventEmitter<any>();
  form: FormGroup;
  pages = [];
  @Input() returnParams: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.action.initForm(this.fb);
  }

  ngOnChanges() {
    this.setPages();
  }

  get pageField(): Field {
    return this.action.field('page');
  }

  get currentPage(): number {
    return +this.pageField.value;
  }

  setPage(filters) {
    if (filters.page) {
      this.form.patchValue({ page: filters.page });
    }
  }

  navToPage(page) {
    const queryParams = this.returnParams;
    this.pageField.value = page;
    this.changePage.emit(Object.assign({}, queryParams, { page: page }));
    this.setPages();
  }

  private ellipsisNow(page: number): boolean {
    if (this.pageField.max < 7) { return false; }
    if (page === 1 || page === this.pageField.max) { return false; }

    const current = this.currentPage;
    return page < current - 1 || page > current + 1;
  }

  private calcPages() {
    const max = this.pageField.max;
    if (max < 7) {
      return Array(max).fill(0).map((x, i) => i + 1);
    }

    const pages = [];
    const current = this.currentPage;
    for (let i = 1; i <= max; i++) {
      if (this.ellipsisNow(i)) {
        pages.push(false);
        i = (i < current) ? current - 2 : max - 1;
      } else {
        pages.push(i);
      }
    }
    return pages;
  }

  private setPages() {
    this.pages = this.calcPages();
  }
}
