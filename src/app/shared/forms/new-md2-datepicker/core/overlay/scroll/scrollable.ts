/* tslint:disable */
import {Directive, ElementRef, OnInit, OnDestroy, NgZone, Renderer} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ScrollDispatcher} from './scroll-dispatcher';
import 'rxjs/add/observable/fromEvent';


/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
@Directive({
  selector: '[cdk-scrollable]'
})
export class Scrollable implements OnInit, OnDestroy {
  private _elementScrolled: Subject<Event> = new Subject();
  private _scrollListener: Function;

  constructor(private _elementRef: ElementRef,
              private _scroll: ScrollDispatcher,
              private _ngZone: NgZone,
              private _renderer: Renderer) {}

  ngOnInit() {
    this._scrollListener = this._ngZone.runOutsideAngular(() => {
      return this._renderer.listen(this.getElementRef().nativeElement, 'scroll', (event: Event) => {
        this._elementScrolled.next(event);
      });
    });

    this._scroll.register(this);
  }

  ngOnDestroy() {
    this._scroll.deregister(this);

    if (this._scrollListener) {
      this._scrollListener();
      this._scrollListener = null;
    }
  }

  /**
   * Returns observable that emits when a scroll event is fired on the host element.
   */
  elementScrolled(): Observable<any> {
    return this._elementScrolled.asObservable();
  }

  getElementRef(): ElementRef {
    return this._elementRef;
  }
}
