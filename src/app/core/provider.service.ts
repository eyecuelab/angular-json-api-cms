import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SessionService } from './session.service';

@Injectable()
export class ProviderService {
  private imagesUpdatedSource = new Subject<any>();
  private colorUpdatedSource = new Subject<string>();

  imagesUpdated$ = this.imagesUpdatedSource.asObservable();
  colorUpdated$ = this.colorUpdatedSource.asObservable();

  constructor(private sessionService: SessionService) {}

  updateImages(images: any) {
    this.instance.attributes.images = images;
    this.imagesUpdatedSource.next(images);
  }

  updateColor(color: string) {
    this.instance.attributes.color = color;
    this.colorUpdatedSource.next(color);
  }

  get instance() {
    return this.sessionService.instance.provider;
  }
}
