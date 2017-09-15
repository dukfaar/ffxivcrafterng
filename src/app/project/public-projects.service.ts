import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BehaviorSubject, Observable } from 'rxjs'

import { SocketService } from '../socket'
import { RestService, RestResource } from '../rest'

import { Project } from './project.type'
import { ProjectDataService } from './project-data.service'

import { Debounce } from '../debounce'

import { StepDataService } from './step-data.service'

import { UserService } from '../user/user.service'

import * as _ from 'lodash'

@Injectable()
export class PublicProjectService {
  private projectRestEndpoint: string = '/api/rest/project'
  idList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  projectList: Observable<BehaviorSubject<Project>[]>
  projectResource: RestResource<Project>

  constructor(
    private socket: SocketService,
    private http: HttpClient,
    private stepData: StepDataService,
    private rest: RestService,
    private projectData: ProjectDataService,
    private userService: UserService
  ) {
    this.projectResource = this.rest.createResource<Project>(this.projectRestEndpoint)
    this.fetchPublicProjectIds()

    this.socket.on('new project created', () => this.debouncedFetchPublicProjectIds())
    this.socket.on('project data changed', () => this.debouncedFetchPublicProjectIds())
    this.socket.on('CraftingProject created', () => this.debouncedFetchPublicProjectIds())
    this.socket.on('CraftingProject deleted', () => this.debouncedFetchPublicProjectIds())
    this.socket.on('CraftingProject updated', () => this.debouncedFetchPublicProjectIds())
    this.socket.on('project deleted', () => this.debouncedFetchPublicProjectIds())

    this.projectList = this.idList.map(ids => _.map(ids, id => this.projectData.get(id)))

    this.projectList.map(projects => {
      return projects
    })
  }

  @Debounce(300) debouncedFetchPublicProjectIds() { this.fetchPublicProjectIds() }

  fetchPublicProjectIds() {
    Observable.forkJoin(
      this.http.get<{_id: string}[]>(this.projectRestEndpoint+'?select=_id&public=true&private=false')
      .map(response => _.map(response, o => o._id)),
      this.http.get<{_id: string}[]>(this.projectRestEndpoint+'?select=_id&sharedWith=' + this.userService.getUser()._id)
      .map(response => _.map(response, o => o._id)),
      this.http.get<{_id: string}[]>(this.projectRestEndpoint+'?select=_id&creator=' + this.userService.getUser()._id)
      .map(response => _.map(response, o => o._id))
    )
    .subscribe(response => {
      let [publicProjects, sharedProjects, ownProjects] = response
      let projects = _.uniq(_.concat(publicProjects, sharedProjects, ownProjects))
      this.idList.next(projects)
    })
  }
}
