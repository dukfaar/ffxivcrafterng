import { Component, OnInit, Input } from '@angular/core'

import { Project } from '../project.type'
import { RestService, RestResource } from '../../rest'

import { UserModel } from '../../user/user.type'

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project

  constructor(public rest: RestService) {
  }

  ngOnInit() {
  }
}
