import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Resource, SessionService } from './../../core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @HostBinding('class.is-collapsed') @Input() isCollapsed = false;
  @Output() toggleCollapsed = new EventEmitter<any>();

  constructor(
    private sessionService: SessionService) {
  }

  ngOnInit() {
    this.setCollapsed(window.innerWidth);
    Observable.fromEvent(window, 'resize')
      .map((e: Event) => e.target)
      .subscribe((window: Window) => {
        this.setCollapsed(window.innerWidth);
      });
  }

  get user(): Resource {
    return this.sessionService.instance.user;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  openAtWidth(width) {
    if (window.innerWidth <= width) {
      this.isCollapsed = true;
    }
  }

  setCollapsed(width: number) {
    this.isCollapsed = window.innerWidth <= 890 ? true : this.isCollapsed;
  }
}
