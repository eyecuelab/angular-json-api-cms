import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Resource } from '../api/resource';
import { Subject } from 'rxjs/Subject';
import { FakeSessionService } from './fake-session.service';
@Injectable()
export class FakeProviderService {
  private imagesUpdatedSource = new Subject<any>();
  private colorUpdatedSource = new Subject<string>();

  imagesUpdated$ = this.imagesUpdatedSource.asObservable();
  colorUpdated$ = this.colorUpdatedSource.asObservable();


  instance: Resource = plainToClass(Resource, {
    id: 1,
    type: 'provider',
    attributes: {
      name: 'Fakey Provider',
      images: {
        logo: '',
        bg: '',
        bw_logo: ''
      },
      color: ''
    }
  });

  updateImages(images: any) {
    this.instance.attributes.images = images;
    this.imagesUpdatedSource.next(images);
  }
  updateColor(color: string) {
    color = '';
    this.instance.attributes.color = color;
    this.colorUpdatedSource.next(color);
  }

  // get instance() {
  //   return this.fakeessionService.instance.provider;
  // }
}
