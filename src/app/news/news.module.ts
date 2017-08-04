import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module'

import { NewsCardComponent } from './news-card/news-card.component'
import { BaseModule } from '../base/base.module'
import { SocketModule } from '../socket/socket.module'
import { RestModule } from '../rest'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
]

@NgModule({
  declarations: [
    //Components
    NewsCardComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    BaseModule,
    RouterModule.forChild(moduleRoutes),
    RestModule,
    SocketModule,
  ],
  exports: [
    NewsCardComponent,
  ],
  providers: [
  ]
})
export class NewsModule {}
