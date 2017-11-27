import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<any>();
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
