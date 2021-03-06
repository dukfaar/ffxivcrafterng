import { Component, OnInit } from '@angular/core'
import { MdDialog } from '@angular/material'

import { BehaviorSubject } from 'rxjs'

import { Project } from './project.type'

import { Debounce } from '../debounce'
import { SocketService, SocketComponent } from '../socket'
import { RestService, RestResource } from '../rest'

import { UserService } from '../user/user.service'

import { ProjectCreationDialogComponent } from './project-creation-dialog/project-creation-dialog.component'

import * as _ from 'lodash'

@Component({
  selector: 'private-project-overview',
  templateUrl: './private-project-overview.component.html'
})
export class PrivateProjectOverviewComponent extends SocketComponent implements OnInit {
  projects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])
  privateProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])
  sharedProjects: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])

  projectResource: RestResource<Project>

  constructor(socket: SocketService, private rest: RestService, private user: UserService, private dialog: MdDialog) {
    super(socket)

    this.projectResource = this.rest.createResource<Project>('/api/rest/project')
  }

  ngOnInit() {
    this.privateProjects.subscribe(projects => this.emitNextProjects())
    this.sharedProjects.subscribe(projects => this.emitNextProjects())

    this.fetchProjects()

    this.onSocket('project data changed', () => this.debouncedFetchProjects())
    this.onSocket('new project created', () => this.debouncedFetchProjects())
    this.onSocket('project deleted', () => this.debouncedFetchProjects())
  }

  emitNextProjects() {
    this.projects.next(_.concat(this.privateProjects.getValue(), this.sharedProjects.getValue()))
  }

  @Debounce(300) debouncedFetchProjects() { this.fetchProjects() }

  fetchProjects() {
    this.projectResource.query({private: true, creator: this.user.getUser()._id})
    .subscribe(projects => {
      this.privateProjects.next(projects)
    })
    this.projectResource.query({sharedWith: this.user.getUser()._id})
    .subscribe(projects => {
      this.sharedProjects.next(projects)
    })
  }

  createNewProject() {
    this.dialog.open(ProjectCreationDialogComponent, {
      width: '80%'
    })
  }
}
