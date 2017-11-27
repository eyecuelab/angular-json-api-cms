import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-tabs',
  templateUrl: './drawer-tabs.component.html',
  styleUrls: ['./drawer-tabs.component.scss']
})
export class DrawerTabsComponent implements OnInit {
  @Input() tabs: { label: string; link: string; }[];

  constructor() {
  }

  ngOnInit() {
  }

  isSelected(tab) {
    return;
  }
}
