import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/pairwise';

import { SessionService } from './../core/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeRoute: string;
  previousRoute: string;
  routeAnimationDirection: string;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => {
        this.previousRoute = this.activeRoute;
        this.activeRoute = e.urlAfterRedirects.slice(1).split('/')[0] || 'login';

        // More complex routing animation conditions can go here:
        this.routeAnimationDirection = (this.activeRoute === 'login') ? 'left' : 'right';
      });
  }

  get showLogin(): boolean {
    return this.activeRoute === 'login';
  }

  childClass(child: string): string {
    if (child === this.activeRoute && !this.previousRoute) {
      return 'is-active';
    } else if (child === this.activeRoute) {
      return 'slide-in-' + this.routeAnimationDirection;
    } else if (child === this.previousRoute) {
      return 'slide-out-' + this.routeAnimationDirection;
    }
  }

  childActive(child: string): boolean {
    return child === this.previousRoute || child === this.activeRoute;
  }
}
