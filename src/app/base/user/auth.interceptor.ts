import { Injectable, Inject, forwardRef } from '@angular/core'

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { UserTokenService } from './user-token.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userToken: UserTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.userToken.get() != null) {
      const authHeader = this.userToken.getAuthorizationHeader()

      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)})

      return next.handle(authReq)
    } else {
      return next.handle(req)
    }
  }
}
