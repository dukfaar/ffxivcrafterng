import { Component } from '@angular/core'

import { Observable } from 'rxjs'

import { AnalysedFilteredPublicProjectsService } from '../analysed-filtered-public-projects.service'
import { UserService } from '../../base/user/user.service'
import { ProjectAnalysisData } from '../project-analysis-data.type'

import * as _ from 'lodash'

@Component({
  selector: 'craftscat-corner',
  templateUrl: 'craftscat-corner.component.html'
})
export class CraftscatCornerComponent {
  filterText: string = ''

  public analysedFilteredProjectList: Observable<ProjectAnalysisData[]>

  filterProjects(analysedProjectList): ProjectAnalysisData[] {
    return _.map(analysedProjectList, (analysedProject:ProjectAnalysisData) => {
      let filterRegex = new RegExp(this.filterText, 'i')

      analysedProject.filteredGatherListArray = _.filter(analysedProject.gatherListArray, g => {
        return g.item.name.match(filterRegex)
      })

      analysedProject.filteredCraftableStepsList = _.filter(analysedProject.craftableStepsList, c => {
        return c.step.item.name.match(filterRegex)
      })

      return analysedProject
    }) as ProjectAnalysisData[]
  }

  constructor(public projectsService: AnalysedFilteredPublicProjectsService, public user: UserService) {
  }

  ngOnInit() {
    this.analysedFilteredProjectList = this.projectsService.list.map(analysedProjectList => this.filterProjects(analysedProjectList))
  }
}
