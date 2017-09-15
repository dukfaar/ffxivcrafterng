import { Injectable } from '@angular/core'
import { BehaviorSubject, Subscription, Observable } from 'rxjs'
import { Project } from './project.type'
import { UserService } from '../user/user.service'

import { PublicProjectService } from './public-projects.service'
import { ProjectDataService } from './project-data.service'

import 'rxjs/add/observable/zip'

import * as _ from 'lodash'

@Injectable()
export class FilteredPublicProjectsService {
  public idList: Observable<string[]>

  private subscriptions: Subscription

  constructor(private publicProjects: PublicProjectService, private user: UserService, private projectData: ProjectDataService) {
    this.idList = this.publicProjects.idList
    .distinctUntilChanged((oldValue, newValue) => _.isEqual(oldValue, newValue))
    .map(projectIds => _.map(projectIds, id => this.projectData.get(id)))
    .flatMap(projectObservables => Observable.zip(...projectObservables))
    .map(projects => _.reject(projects, p => _.includes(p.hiddenOnOverviewBy, this.user.getUser()._id)))
    .map(projects => _.map(projects, p => p._id ))
  }
}
