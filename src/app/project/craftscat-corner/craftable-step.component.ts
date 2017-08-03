import { Component, Input } from '@angular/core'

import { CraftableStep } from '../craftable-step.type'

@Component({
  selector: 'craftable-step',
  templateUrl: 'craftable-step.component.html'
})
export class CraftableStepComponent {
  @Input() step: CraftableStep

  constructor() {

  }

  private clicked() {
    console.log("clicked craftable step")
  }
}
