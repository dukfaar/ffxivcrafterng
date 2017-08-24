import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { MaterialModule } from '../material/material.module'

import { UserService } from './user.service'
import { UserTokenService } from './user-token.service'
import { LoginFormComponent } from './login-form/login-form.component'
import { AuthInterceptor } from './auth.interceptor'

@NgModule({
  imports: [
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoginFormComponent
  ],
  providers: [
    UserService,
    UserTokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    LoginFormComponent
  ]
})
export class UserModule {}
