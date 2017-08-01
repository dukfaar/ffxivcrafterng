import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material/material.module'

import { PublicProjectService } from './public-projects.service'
import { SocketModule } from '../socket/socket.module'
import { BaseModule } from '../base/base.module'

import { CraftscatCornerComponent } from './craftscat-corner/craftscat-corner.component'

@NgModule({
  declarations: [
    CraftscatCornerComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    SocketModule,
    BaseModule
  ],
  providers: [
    PublicProjectService
  ],
  exports: [
    CraftscatCornerComponent
  ]
})
export class ProjectsModule {

}
