import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { SidenavContentComponent } from './sidenav/sidenav-content.component'
import { SidenavMenuComponent } from './sidenav/sidenav-menu.component'
import { TextFormatter } from './text-formatter/text-formatter.pipe'
import { UserService } from './user/user.service'
import { UserTokenService } from './user/user-token.service'
import { LoginFormComponent } from './user/login-form/login-form.component'

import { MaterialModule } from '../material/material.module'

import { AuthInterceptor } from './user/auth.interceptor'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: 'auth/login', component: LoginFormComponent },
]

@NgModule({
  declarations: [
    //Components
    SidenavContentComponent,
    SidenavMenuComponent,
    LoginFormComponent,

    //Pipes
    TextFormatter
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(moduleRoutes)
  ],
  exports: [
    SidenavContentComponent,
    LoginFormComponent,
    TextFormatter
  ],
  providers: [
    UserService,
    UserTokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class BaseModule {}
