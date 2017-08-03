import { Component, Input } from '@angular/core'

import { Step } from '../step.type'

import { UserService } from '../../base/user/user.service'

import * as _ from 'lodash'

@Component({
  selector: 'step-paw',
  templateUrl: 'step-paw.component.html'
})
export class StepPawComponent {
  @Input() step: Step

  constructor(private user: UserService) {}

  private isWorkedByMe(): boolean {
    if (!this.step.workedOnBy) return false
    let user = _.find(this.step.workedOnBy, (user) => { return user._id === this.user.getUser()._id })
    if (!user) return false
    return true
  }

  private removeMarkStepAsWorked() {
    console.log("removeMarkStepAsWorked")
  }

  private markStepAsWorked() {
    console.log("markStepAsWorked")
  }
}
