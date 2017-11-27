import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, Resource } from '../../core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit() {
  }

  get user(): Resource {
    return this.sessionService.instance.user;
  }

  get providerUser(): Resource {
    return this.sessionService.instance.providerUser;
  }

  logout() {
    this.sessionService
        .logout()
        .subscribe(value => this.actionSuccess(value));
  }

  private actionSuccess(value) {
    this.router.navigate(['/']);
  }
}
