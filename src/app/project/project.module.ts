import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../material/material.module'

import { PublicProjectService } from './public-projects.service'
import { FilteredPublicProjectsService } from './filtered-public-projects.service'
import { AnalysedFilteredPublicProjectsService } from './analysed-filtered-public-projects.service'

import { SocketModule } from '../socket/socket.module'
import { BaseModule } from '../base/base.module'
import { ItemModule } from '../item/item.module'
import { ProjectAnalysisService } from './project-analysis.service'

import { CraftscatCornerComponent } from './craftscat-corner/craftscat-corner.component'
import { CraftableStepComponent } from './craftscat-corner/craftable-step.component'
import { GatherableStepComponent } from './craftscat-corner/gatherable-step.component'
import { StepPawComponent } from './craftscat-corner/step-paw.component'

import { PrivateProjectOverviewComponent } from './private-project-overview.component'
import { ProjectGridComponent } from './project-grid/project-grid.component'
import { ProjectCardComponent } from './project-grid/project-card.component'

import { RestModule } from '../rest'

import { RouterModule, Routes } from '@angular/router'

const moduleRoutes: Routes = [
  { path: 'project/private', component: PrivateProjectOverviewComponent },
]

@NgModule({
  declarations: [
    CraftscatCornerComponent,
    CraftableStepComponent,
    GatherableStepComponent,
    StepPawComponent,
    PrivateProjectOverviewComponent,
    ProjectGridComponent,
    ProjectCardComponent
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
    PublicProjectService,
    ProjectAnalysisService,
    FilteredPublicProjectsService,
    AnalysedFilteredPublicProjectsService
  ],
  exports: [
    CraftscatCornerComponent,
    CraftableStepComponent,
    GatherableStepComponent,
    StepPawComponent,
    PrivateProjectOverviewComponent,
    ProjectGridComponent,
    ProjectCardComponent
  ]
})
export class ProjectModule {

}
