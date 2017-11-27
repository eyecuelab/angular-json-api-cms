import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { StaticComponent } from './static.component';
import { ContactUsComponent } from './pages/contact-us.component';

import { routeConfig, AuthGuard, AnonGuard } from './../core/route.config';

const routes: Routes = [
  {
    path: 'static',
    component: StaticComponent,
    children: [
      {
        path: '',
        redirectTo: 'contact-us',
        pathMatch: 'full'
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
  providers: []
})
export class StaticRoutingModule { }
