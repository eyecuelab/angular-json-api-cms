import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { OopsModule } from './oops/oops.module';
import { LoginModule } from './login/login.module';
import { DevicesModule } from './devices/devices.module';
import { StaticModule } from './static/static.module';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular modules
    BrowserModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
    // core & shared
    CoreModule,
    SharedModule,
    // feature modules
    OopsModule,
    LoginModule,
    DevicesModule,
    StaticModule,
    // routing
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
