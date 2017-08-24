import { Component } from '@angular/core'

import { UserService } from '../../user/user.service'

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public user: UserService) {}
}
