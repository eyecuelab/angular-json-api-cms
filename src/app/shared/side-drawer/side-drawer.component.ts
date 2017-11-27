import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss']
})
export class SideDrawerComponent implements OnInit {
  @HostBinding('class.is-open') @Input() isOpen = false;
  @HostBinding('class.is-hidden') @Input() hidden = false;
  @Input() type: 'detail' | 'control';
  @Input() returnLink: string;
  @Input() returnParams: any;
  eventData: {};

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.router.navigate([this.returnLink], { queryParams: this.returnParams });
  }
}
