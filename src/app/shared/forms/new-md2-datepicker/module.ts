/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  MdRippleModule,
  RtlModule,
  ObserveContentModule,
  PortalModule,
  OverlayModule,
  A11yModule,
  CompatibilityModule,
} from './core/index';

import { NewMD2DatepickerModule } from './datepicker/index';

import { PlatformModule } from './core/platform/index';
import { StyleModule } from './core/style/index';

const MD2_MODULES = [
  NewMD2DatepickerModule,
  MdRippleModule,
  OverlayModule,
  PortalModule,
  RtlModule,
  StyleModule,
  A11yModule,
  PlatformModule,
  CompatibilityModule,
  ObserveContentModule
];

@NgModule({
  imports: [
    NewMD2DatepickerModule.forRoot(),
    MdRippleModule.forRoot(),
    PortalModule.forRoot(),
    RtlModule.forRoot(),
    ObserveContentModule.forRoot(),

    // These modules include providers.
    A11yModule.forRoot(),
    PlatformModule.forRoot(),
    OverlayModule.forRoot(),
    CompatibilityModule.forRoot(),
  ],
  exports: MD2_MODULES,
})
export class Md2RootModule { }


@NgModule({
  imports: MD2_MODULES,
  exports: MD2_MODULES,
})
export class NewMD2Module {
  /** @deprecated */
  static forRoot(): ModuleWithProviders {
    return { ngModule: Md2RootModule };
  }
}
