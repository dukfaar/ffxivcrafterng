import { Component } from '@angular/core'

import { UserService } from '../../base/user/user.service'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public user: UserService) {}
}
