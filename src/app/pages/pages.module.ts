import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'

import { BaseModule } from '../base/base.module'
import { UserModule } from '../user/user.module'
import { NewsModule } from '../news/news.module'
import { ProjectModule } from '../project/project.module'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
]

@NgModule({
  declarations: [
    //Components
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    BaseModule,
    NewsModule,
    ProjectModule,
    UserModule,

    RouterModule.forChild(moduleRoutes)
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PagesModule {}
