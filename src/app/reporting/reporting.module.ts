import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material/material.module'

import { SocketModule } from '../socket/socket.module'
import { BaseModule } from '../base/base.module'
import { ItemModule } from '../item/item.module'

import { RestModule } from '../rest'

import { RouterModule, Routes } from '@angular/router'

import { ProjectReportComponent } from './project-report/project-report.component'

const moduleRoutes: Routes = [
  { path: 'reporting/project/:id', component: ProjectReportComponent},
]

@NgModule({
  declarations: [
    ProjectReportComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    SocketModule,
    BaseModule,
    ItemModule,
    RestModule,

    RouterModule.forChild(moduleRoutes)
  ],
  providers: [
  ],
  exports: [
    ProjectReportComponent
  ],
  entryComponents: [
  ]
})
export class ReportingModule {

}
