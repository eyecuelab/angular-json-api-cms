import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService, ProviderService } from './../../core';

/* tslint:disable */
@Directive({
  selector: '[providerBgImage]'
})
/* tslint:enable */
export class ProviderBgImageDirective implements OnInit, OnDestroy {
  image: string;
  subscription: Subscription;

  constructor(private sessionService: SessionService,
              private providerService: ProviderService,
              private el: ElementRef) {
  }

  ngOnInit() {
    // this.setBackground(this.providerService.instance.attributes.images.bg);
    this.subscription = this.providerService.imagesUpdated$.subscribe(images => {
      this.setBackground(images.bg);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setBackground(image) {
    if (image) {
      this.el.nativeElement.style.backgroundImage = 'url(' + image + ')';
    }
  }
}
