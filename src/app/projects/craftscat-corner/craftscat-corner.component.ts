import { Component } from '@angular/core'

import { PublicProjectService } from '../public-projects.service'

@Component({
  selector: 'craftscat-corner',
  templateUrl: 'craftscat-corner.component.html'
})
export class CraftscatCornerComponent {
  private filterText: string

  constructor(private publicProjectService: PublicProjectService) {

  }
}
