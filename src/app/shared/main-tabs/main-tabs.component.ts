import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

type ActiveFunc = () => boolean;

export class Tab {
  label: string;
  link: string;
  params?: any;
  active: ActiveFunc;
}

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss']
})
export class MainTabsComponent implements OnInit {
  @Input() tabs: Tab[];
  @Output() tabChanged = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit() {}

  changeTab(tab: Tab) {
    this.router.navigate([tab.link], { queryParams: tab.params }).then(value => {
      this.tabChanged.emit(tab);
    });
  }
}
