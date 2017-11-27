import { APP_INITIALIZER } from '@angular/core';

import { SessionService } from './session.service';

import 'rxjs/add/operator/toPromise';

export function init(sessionService: SessionService) {
  return () => {
    return sessionService.load().toPromise();
  };
}

export function initConfig() {
  return {
    'provide': APP_INITIALIZER,
    'useFactory': init,
    'deps': [SessionService],
    'multi': true
  };
}
