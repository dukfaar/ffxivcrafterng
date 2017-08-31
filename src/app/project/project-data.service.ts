import { Injectable } from '@angular/core'

import { Project } from './project.type'

import { SocketService } from '../socket'
import { RestService, RestResource } from '../rest'

import { DataService } from '../data/data.service'

@Injectable()
export class ProjectDataService extends DataService<Project> {
  constructor(private rest: RestService, private socket: SocketService) {
    super(rest.createResource('/api/rest/project'))

    this.socket.on('CraftingProject updated',data => {
      console.log(data)
    })

    this.socket.on('project stock changed', data => this.fetch(data.projectId))
    this.socket.on('project data changed', data => this.fetch(data.projectId))
  }
}
