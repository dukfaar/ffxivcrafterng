import { Component } from '@angular/core'

import { UserService } from '../user.service'

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  email: string
  password: string
  
  constructor(private user: UserService) {

  }
}
