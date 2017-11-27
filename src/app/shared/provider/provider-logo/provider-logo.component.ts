import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService, ProviderService } from './../../../core';

@Component({
  selector: 'app-provider-logo',
  templateUrl: './provider-logo.component.html',
  styleUrls: ['./provider-logo.component.scss']
})
export class ProviderLogoComponent implements OnInit, OnDestroy {
  logo: string;
  sub: Subscription;

  constructor(private sessionService: SessionService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    // this.setLogo(this.providerService.instance.attributes.images.logo);
    this.sub = this.providerService.imagesUpdated$.subscribe(images => {
      this.setLogo(images.logo);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setLogo(image) {
    if (image) { this.logo = image; }
  }

}
