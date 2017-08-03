import { Component } from '@angular/core'

import { PublicProjectService } from '../public-projects.service'
import { UserService } from '../../base/user/user.service'

@Component({
  selector: 'craftscat-corner',
  templateUrl: 'craftscat-corner.component.html'
})
export class CraftscatCornerComponent {
  private filterText: string

  constructor(private publicProjectService: PublicProjectService, private user: UserService) {

  }
}
