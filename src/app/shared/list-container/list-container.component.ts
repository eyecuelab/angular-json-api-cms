import { Component, OnInit, Input, Output, EventEmitter, ContentChild, ViewChild, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService, Action, ResourceList } from '../../core';
import { PagerComponent } from '../pager/pager.component';
import { FiltersComponent } from '../filters/filters.component';
import { FilterDisplayComponent } from '../list/filter-display/filter-display.component';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
  @Input() list: ResourceList;
  @ViewChild(FiltersComponent) filterControls: FiltersComponent;
  @ViewChild(FilterDisplayComponent) filterDisplay: FilterDisplayComponent;
  @ContentChild('listComponent') listComponent: any;
  @ViewChild(PagerComponent) pager: PagerComponent;
  @Input() returnParams: any;
  @Input() showFilters = true;
  @Input() resetOnFieldChange: string;
  @Input() listType: string;

  get action(): Action {
    return this.list.meta.action('index');
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    if (this.listComponent) { this.listComponent.list = this.list; }
  }

  toggleLaterStages() {
    this.filterControls.toggleLaterStages();
  }

  updateList(params) {
    this.api
        .getList(this.action.url, params)
        .subscribe((list: ResourceList) => {
          Object.assign(this.list, list);
          this.route.snapshot.data[this.listType] = list;
          this.router.navigate([], { queryParams: params, relativeTo: this.route });
        });
  }
}
