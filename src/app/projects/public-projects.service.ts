import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { SocketService } from '../socket/socket.service'
import { UserService } from '../base/user/user.service'
import { ProjectAnalysisService } from './project-analysis.service'
import { ProjectAnalysisData } from './project-analysis-data.type'

import { Project } from './project.type'

import * as _ from 'lodash'

@Injectable()
export class PublicProjectService {
  private unfilteredProjectList: Project[] = []
  private filteredProjectList: Project[] = []
  private analysedProjectList: ProjectAnalysisData[] = []

  constructor(
    private socket: SocketService,
    private http: HttpClient,
    private user: UserService,
    private analysisService: ProjectAnalysisService
  ) {
    this.fetchPublicProjects()
  }

  fetchPublicProjects() {
    this.http.get<Project[]>('/api/project/public')
    .subscribe(response => {
      this.unfilteredProjectList = response
      this.filteredProjectList = _.reject(this.unfilteredProjectList, (project: Project) => _.includes(project.hiddenOnOverviewBy, this.user.getUser()._id))
      this.analysedProjectList = _.map(this.filteredProjectList, p => this.analysisService.analyseProject(p))
    })
  }
}
