import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'

import { BaseModule } from './base/base.module'
import { MaterialModule } from './material/material.module'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HostnameInterceptor } from './hostname.interceptor'

import  { RouterModule, Routes } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BaseModule,
    MaterialModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HostnameInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
