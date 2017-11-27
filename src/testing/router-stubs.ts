import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras, NavigationEnd, DefaultUrlSerializer, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/* tslint:disable */
@Component({
  selector: 'router-outlet',
  template: ''
})

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})

export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

export class RouterOutletStubComponent { }
/* tslint:enable */

@Injectable()
export class RouterStub {
  public ne = new NavigationEnd(0, 'http://localhost:4200', 'http://localhost:4200');
  private serial = new DefaultUrlSerializer();
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
  createUrlTree() {}
  navigateByUrl(url: string) { return url; };
  serializeUrl(url: UrlTree) { return 'url'; };
  navigate(commands: any[], extras?: NavigationExtras) { };
}
