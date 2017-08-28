import { Component, Input } from '@angular/core'

import { ProjectAnalysisData } from '../project-analysis-data.type'

@Component({
  selector: 'project-craftable-list',
  templateUrl: 'project-craftable-list.component.html'
})
export class ProjectCraftableListComponent {
  @Input() analysisData: ProjectAnalysisData
}
