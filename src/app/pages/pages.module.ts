import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'

import { HomeComponent } from './home/home.component'
import { BaseModule } from '../base/base.module'
import { NewsModule } from '../news/news.module'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: '', component: HomeComponent }, //Home Path
]

@NgModule({
  declarations: [
    //Components
    HomeComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    BaseModule,
    NewsModule,
    RouterModule.forChild(moduleRoutes),
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PagesModule {}
