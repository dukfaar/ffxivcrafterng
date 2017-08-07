import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material/material.module'

import { PublicProjectService } from './public-projects.service'
import { SocketModule } from '../socket/socket.module'
import { BaseModule } from '../base/base.module'
import { ItemModule } from '../item/item.module'
import { ProjectAnalysisService } from './project-analysis.service'

import { CraftscatCornerComponent } from './craftscat-corner/craftscat-corner.component'
import { CraftableStepComponent } from './craftscat-corner/craftable-step.component'
import { GatherableStepComponent } from './craftscat-corner/gatherable-step.component'
import { StepPawComponent } from './craftscat-corner/step-paw.component'

import { RestModule } from '../rest'

@NgModule({
  declarations: [
    CraftscatCornerComponent,
    CraftableStepComponent,
    GatherableStepComponent,
    StepPawComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    SocketModule,
    BaseModule,
    ItemModule,
    RestModule
  ],
  providers: [
    PublicProjectService,
    ProjectAnalysisService
  ],
  exports: [
    CraftscatCornerComponent,
    CraftableStepComponent,
    GatherableStepComponent,
    StepPawComponent
  ]
})
export class ProjectModule {

}
