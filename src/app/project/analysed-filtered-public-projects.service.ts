import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { ProjectAnalysisService } from './project-analysis.service'
import { ProjectAnalysisData } from './project-analysis-data.type'

import { FilteredPublicProjectsService } from './filtered-public-projects.service'

import * as _ from 'lodash'

@Injectable()
export class AnalysedFilteredPublicProjectsService {
  public list: BehaviorSubject<ProjectAnalysisData[]> = new BehaviorSubject<ProjectAnalysisData[]>([])

  constructor(private analysisService: ProjectAnalysisService, private filteredProjects: FilteredPublicProjectsService) {
    this.filteredProjects.list
    .distinctUntilChanged((oldValue, newValue) => {
      return _.isEqual(oldValue, newValue)
    })
    .subscribe(projects => {
      this.list.next(_.map(projects, p => this.analysisService.analyseProject(p)))
    })
  }
}
