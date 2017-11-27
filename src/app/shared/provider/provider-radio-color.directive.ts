import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService, ProviderService } from './../../core';

/* tslint:disable */
@Directive({
  selector: '[providerRadioColor]'
})
/* tslint:enable */
export class ProviderRadioColorDirective implements OnInit, OnDestroy {
  @Input('providerRadioColor') isActive: boolean;
  color: string;
  subscription: Subscription;

  constructor(private sessionService: SessionService,
              private providerService: ProviderService,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.setRadioColor(this.sessionService.instance.provider.attributes.color);
    this.subscription = this.providerService.colorUpdated$.subscribe(color => {
      this.setRadioColor(color);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setRadioColor(color: string) {
    const elements = this.el.nativeElement.querySelectorAll('.mat-radio-inner-circle');
    if (color && /#[0-9a-zA-Z]{6}/g.test(color) && !(this.isActive === false)) {
      for (const element of elements) {
        element.style.backgroundColor = color;
      }
    } else {
      for (const element of elements) {
        element.style.backgroundColor = '#e9cf58';
      }
    }
  }
}
