import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'

import { BaseModule } from '../base/base.module'
import { NewsModule } from '../news/news.module'
import { ProjectsModule } from '../projects/projects.module'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: '', component: HomeComponent }, //Home Path
  { path: 'home', component: HomeComponent }, //Home Path
  { path: 'auth/login', component: LoginComponent }, //Home Path
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
    ProjectsModule,
    RouterModule.forChild(moduleRoutes),
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PagesModule {}
