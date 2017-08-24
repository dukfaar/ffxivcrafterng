import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Project } from './project.type'
import { UserService } from '../user/user.service'

import { PublicProjectService } from './public-projects.service'

import * as _ from 'lodash'

@Injectable()
export class FilteredPublicProjectsService {
  public list: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([])

  constructor(private publicProjects: PublicProjectService, private user: UserService) {
    this.publicProjects.list
    .distinctUntilChanged((oldValue, newValue) => {
      return _.isEqual(oldValue, newValue)
    })
    .subscribe(projects => {
      this.list.next(_.reject(projects, (project: Project) => _.includes(project.hiddenOnOverviewBy, this.user.getUser()._id)))
    })
  }
}
