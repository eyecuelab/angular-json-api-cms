import { Component, EventEmitter, OnInit, Input, Output  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Action, SessionService } from '../../../core';

@Component({
  selector: 'app-filter-display',
  templateUrl: './filter-display.component.html',
  styleUrls: ['./filter-display.component.scss']
})
export class FilterDisplayComponent implements OnInit {
  @Input() action: Action;
  @Input() header: string;
  @Output() toggleFilters = new EventEmitter<any>();
  filters: any = {};

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  setFilters(filters) {
    this.filters = filters;
  }

  fieldValue(name) {
    return this.action.field(name).currentValue;
  }

  get fields() {
    const fields = this.action.fields.filter(field =>
      field.name !== 'page'
      && field.name !== 'state'
      && field.name !== 'sort'
      && field.value);
    const sortField = this.action.fields.find(field => field.name === 'sort');
    if (sortField) { fields.unshift(sortField); }
    return fields;
  }
}
