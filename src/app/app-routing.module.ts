import { NgModule, OnInit } from '@angular/core';
import { Routes, Router, RouterModule, NavigationStart } from '@angular/router';

import 'rxjs/add/operator/filter';

const routes: Routes = [
  { path: '**', redirectTo: '/devices', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
  constructor(private router: Router) {
    router.events.forEach((event) => {
      // console.log('klass: ', event.constructor.name);
    });
    // router.events
    //       .filter(event => event instanceof NavigationStart)
    //       .subscribe((event: NavigationStart) => {
    //         // console.log('nav start event: ', event);
    //         return false;
    //       });
    // console.log('app routing const');
  }
}
