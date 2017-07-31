import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'

import { BaseModule } from './base/base.module'
import { NewsModule } from './news/news.module'
import { PagesModule } from './pages/pages.module'
import { MaterialModule } from './material/material.module'

import { WildcardRoutingModule } from './wildcard-routing/wildcard-routing.module'

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
    NewsModule,
    PagesModule,
    MaterialModule,
    RouterModule.forRoot([]),

    WildcardRoutingModule //this MUST be last to work properly
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
