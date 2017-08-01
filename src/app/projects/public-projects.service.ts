import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { SocketService } from '../socket/socket.service'
import { UserService } from '../base/user/user.service'

import { Project } from './project.type'

import * as _ from 'lodash'

@Injectable()
export class PublicProjectService {
  private unfilteredProjectList: Project[] = []
  private filteredProjectList: Project[] = []

  constructor(private socket: SocketService, private http: HttpClient, private user: UserService) {
    this.fetchPublicProjects()
  }

  fetchPublicProjects() {
    this.http.get<Project[]>('/api/project/public')
    .subscribe(response => {
      this.unfilteredProjectList = response
      this.filteredProjectList = _.reject(this.unfilteredProjectList, (project: Project) => _.includes(project.hiddenOnOverviewBy, this.user.getUser()._id))
    })
  }
}
