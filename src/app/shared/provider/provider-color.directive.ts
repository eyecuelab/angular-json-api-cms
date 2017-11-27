import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService, ProviderService } from './../../core';

/* tslint:disable */
@Directive({
  selector: '[providerColor]'
})
/* tslint:enable */
export class ProviderColorDirective implements OnInit, OnDestroy {
  @Input('providerBgColor') isActive: boolean;
  color: string;
  subscription: Subscription;

  constructor(private sessionService: SessionService,
              private providerService: ProviderService,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.setColor(this.sessionService.instance.provider.attributes.color);
    this.subscription = this.providerService.colorUpdated$.subscribe(color => {
      this.setColor(color);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setColor(color: string) {
    if (color && /#[0-9a-zA-Z]{6}/g.test(color) && !(this.isActive === false)) {
      this.el.nativeElement.style.color = color;
    } else {
      this.el.nativeElement.style.color = '#e9cf58';
    }
  }
}
