import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OopsComponent } from './oops.component';

const routes: Routes = [
  {
    path: 'oops',
    component: OopsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ],
  providers: []
})
export class OopsRoutingModule { }
