import { Injectable } from '@angular/core'

import { BehaviorSubject, Observable } from 'rxjs'

import { ProjectAnalysisService } from './project-analysis.service'
import { ProjectAnalysisData } from './project-analysis-data.type'

import { FilteredPublicProjectsService } from './filtered-public-projects.service'
import { ProjectDataService } from './project-data.service'

import * as _ from 'lodash'

@Injectable()
export class AnalysedFilteredPublicProjectsService {
  public list: BehaviorSubject<ProjectAnalysisData[]> = new BehaviorSubject<ProjectAnalysisData[]>([])

  constructor(private analysisService: ProjectAnalysisService,
    private filteredProjects: FilteredPublicProjectsService,
    private projectData: ProjectDataService) {
    this.filteredProjects.idList
    .distinctUntilChanged((oldValue, newValue) => _.isEqual(oldValue, newValue))
    .map(projectIds => _.map(projectIds, id => this.projectData.get(id)))
    .flatMap(projectObservables => Observable.zip(...projectObservables))
    .map(projects =>  _.map(projects, p => this.analysisService.analyseProject(p)))
    .subscribe(projects => {
      console.log(JSON.stringify(projects))
      this.list.next(projects)
    })
  }
}
