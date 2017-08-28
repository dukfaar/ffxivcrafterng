import { Component, Input } from '@angular/core'

import { ProjectAnalysisData } from '../project-analysis-data.type'

@Component({
  selector: 'project-gatherable-list',
  templateUrl: 'project-gatherable-list.component.html'
})
export class ProjectGatherableListComponent {
  @Input() analysisData: ProjectAnalysisData
}
