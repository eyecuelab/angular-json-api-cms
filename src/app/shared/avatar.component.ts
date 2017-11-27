import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: '<img src="{{src || defaultSrc}}" />',
  styles: ['img { width: 100%; height: 100%; }']
})
export class AvatarComponent {
  @Input() src: string;
  defaultSrc = '/assets/img/shared/default-avatar.png';

  constructor() {
  }

}
