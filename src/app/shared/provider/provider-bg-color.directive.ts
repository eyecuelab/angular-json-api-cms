import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService, ProviderService } from './../../core';

/* tslint:disable */
@Directive({
  selector: '[providerBgColor]'
})
/* tslint:enable */
export class ProviderBgColorDirective implements OnInit, OnDestroy {
  @Input('providerBgColor') isActive: boolean;
  color: string;
  subscription: Subscription;

  constructor(private sessionService: SessionService,
              private providerService: ProviderService,
              private el: ElementRef) {
  }

  ngOnInit() {
    // this.setBgColor(this.sessionService.instance.provider.attributes.color);
    this.subscription = this.providerService.colorUpdated$.subscribe(color => {
      this.setBgColor(color);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setBgColor(color: string) {
    if (color && /#[0-9a-zA-Z]{6}/g.test(color) && !(this.isActive === false)) {
      this.el.nativeElement.style.backgroundColor = color;
    } else {
      this.el.nativeElement.style.backgroundColor = '#e9cf58';
    }
  }
}
