import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { SocketService } from '../socket/socket.service'

import { Project } from './project.type'

@Injectable()
export class PublicProjectService {
  unfilteredProjectList: Project[]
  filteredProjectList: Project[]

  constructor(private socket: SocketService, private http: HttpClient) {
    this.fetchPublicProjects()
  }

  fetchPublicProjects() {
    this.http.get<Project[]>('/api/project/public')
    .subscribe(response => {
      this.unfilteredProjectList = response
      this.filteredProjectList = this.unfilteredProjectList
      //this.projectList = _.reject(response.data, function (p) { return ProjectService.isHiddenFromOverview(p, MeanUser.user) })
    })
  }
}
