import { Component, Input } from '@angular/core'

import { ProjectAnalysisData } from '../project-analysis-data.type'

@Component({
  selector: 'project-stock-list',
  templateUrl: 'project-stock-list.component.html'
})
export class ProjectStockListComponent {
  @Input() analysisData: ProjectAnalysisData
}
