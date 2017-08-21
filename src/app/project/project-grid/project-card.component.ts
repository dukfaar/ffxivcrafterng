import { Component, OnInit, Input } from '@angular/core'

import { Project } from '../project.type'

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html'
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project

  constructor() {}

  ngOnInit() {}
}
