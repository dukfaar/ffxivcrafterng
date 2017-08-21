import { Component, OnInit, Input } from '@angular/core'

import { Project } from '../project.type'

@Component({
  selector: 'project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.css']
})
export class ProjectGridComponent implements OnInit {
  @Input() projects: Project[]

  constructor() {}

  ngOnInit() {}
}
