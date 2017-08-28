import { Injectable } from '@angular/core'

import { Project } from './project.type'
import { ProjectAnalysisData } from './project-analysis-data.type'
import { ProjectAnalysisService } from './project-analysis.service'

import { Observable } from 'rxjs'

@Injectable()
export class ObservableProjectAnalysisService {
  constructor(private analysisService: ProjectAnalysisService) {}

  analyseProject(projectObservable: Observable<Project>): Observable<ProjectAnalysisData> {
    return projectObservable.map(project => {
      return this.analysisService.analyseProject(project)
    })
  }
}
