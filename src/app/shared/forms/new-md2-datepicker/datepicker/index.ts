/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateUtil } from './date-util';
import { DateLocale } from './date-locale';
import { OverlayModule, PortalModule } from '../core';
import { NewMD2Datepicker } from './datepicker';
import { Md2Clock } from './clock';
import { StyleModule } from '../core/style/index';


export * from './datepicker';
export * from './clock';
export * from './date-locale';
export * from './date-util';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    StyleModule,
  ],
  exports: [
    NewMD2Datepicker,
    Md2Clock,
  ],
  declarations: [
    NewMD2Datepicker,
    Md2Clock
  ],
  providers: [DateLocale, DateUtil],
  entryComponents: [
    NewMD2Datepicker,
  ]
})
export class NewMD2DatepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NewMD2DatepickerModule
    };
  }
}
