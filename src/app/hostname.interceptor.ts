import { Injectable, Inject, forwardRef } from '@angular/core'

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HostnameInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedUrl:string = req.url

    if(req.url.startsWith('/')) {
      modifiedUrl = 'https://' + window.location.hostname + ':3001' + modifiedUrl
    } else {
      modifiedUrl = modifiedUrl.replace(window.location.host, window.location.hostname + ':3001')
      modifiedUrl = modifiedUrl.replace('http://', 'https://')
    }

    const hostReq = req.clone({url: modifiedUrl})

    return next.handle(hostReq)
  }
}
