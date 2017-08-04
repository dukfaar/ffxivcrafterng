import { Component, Input } from '@angular/core'

import { Step } from '../step.type'

import { UserService } from '../../base/user/user.service'
import { RestService } from '../../rest'

import * as _ from 'lodash'

@Component({
  selector: 'step-paw',
  templateUrl: 'step-paw.component.html'
})
export class StepPawComponent {
  @Input() step: Step
  stepResource

  constructor(public user: UserService, private rest: RestService) {
    this.stepResource = rest.createResource('/api/projectstep')
  }

  isWorkedByMe(): boolean {
    if (!this.step.workedOnBy) return false
    let user = _.find(this.step.workedOnBy, (user) => { return user._id === this.user.getUser()._id })
    if (!user) return false
    return true
  }

  markStepAsWorked() {
    if (!this.step.workedOnBy) this.step.workedOnBy = []
    this.step.workedOnBy.push(this.user.getUser())
    this.stepResource.put(this.step._id, {workedOnBy: this.step.workedOnBy}).subscribe()
  }

  removeMarkStepAsWorked()  {
    if (this.isWorkedByMe()) {
      _.remove(this.step.workedOnBy, (user) => { return user._id === this.user.getUser()._id })
      this.stepResource.put(this.step._id, {workedOnBy: this.step.workedOnBy}).subscribe()
    }
  }
}
