import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { AgmCoreModule } from '@agm/core';
import { Md2Module } from 'md2';

import { SingleActionComponent,
         BlankComponent, TextInputComponent,
         ProviderLogoComponent, SideNavComponent, TopNavComponent,
         PagerComponent, ProviderBgImageDirective, ProviderBgColorDirective, ProviderRadioColorDirective,
         ProviderColorDirective, MainTabsComponent, FiltersComponent,
         MobileHeaderComponent, AvatarComponent, DrawerTabsComponent,
         SideDrawerComponent, ListContainerComponent, S3UploaderComponent,
         FileDropDirective, SelectComponent, NewMD2Module,
         WarningDialogComponent, FooterComponent
  } from './';

import { PhonePipe, LabelPipe, ReversePipe, FileNamePipe, StatePipe,
         CleanStringPipe, HumanizeStringPipe
  } from './pipes';

import { FilterDisplayComponent } from './list/filter-display/filter-display.component';

import { AirbrakeErrorHandler } from './airbrake-error-handler';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NewMD2Module,
    RouterModule,
    Md2Module
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyDAynL4i3PXP6Ouhl5yOtPyzfT9imj02XY' })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NewMD2Module,
    // AgmCoreModule,
    TextInputComponent,
    ProviderLogoComponent,
    SideNavComponent,
    TopNavComponent,
    PagerComponent,
    ProviderBgImageDirective,
    ProviderBgColorDirective,
    ProviderRadioColorDirective,
    ProviderColorDirective,
    MainTabsComponent,
    DrawerTabsComponent,
    FiltersComponent,
    MobileHeaderComponent,
    SideDrawerComponent,
    AvatarComponent,
    PhonePipe,
    ListContainerComponent,
    LabelPipe,
    FilterDisplayComponent,
    ReversePipe,
    S3UploaderComponent,
    FileNamePipe,
    FileDropDirective,
    SelectComponent,
    StatePipe,
    CleanStringPipe,
    HumanizeStringPipe,
    Md2Module,
    WarningDialogComponent,
    FooterComponent
  ],
  declarations: [
    BlankComponent,
    TextInputComponent,
    ProviderLogoComponent,
    SideNavComponent,
    TopNavComponent,
    PagerComponent,
    ProviderBgImageDirective,
    ProviderBgColorDirective,
    ProviderRadioColorDirective,
    ProviderColorDirective,
    MainTabsComponent,
    DrawerTabsComponent,
    FiltersComponent,
    MobileHeaderComponent,
    SideDrawerComponent,
    AvatarComponent,
    PhonePipe,
    ListContainerComponent,
    LabelPipe,
    FilterDisplayComponent,
    ReversePipe,
    S3UploaderComponent,
    FileNamePipe,
    FileDropDirective,
    SelectComponent,
    StatePipe,
    CleanStringPipe,
    HumanizeStringPipe,
    WarningDialogComponent,
    FooterComponent
  ],
  entryComponents: [ WarningDialogComponent ],
  providers: [ { provide: ErrorHandler, useClass: AirbrakeErrorHandler } ]
})
export class SharedModule {
  constructor() {}
}
