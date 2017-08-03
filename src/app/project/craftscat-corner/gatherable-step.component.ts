import { Component, Input } from '@angular/core'

import { GatherListEntry } from '../gatherlist-entry.type'

@Component({
  selector: 'gatherable-step',
  templateUrl: 'gatherable-step.component.html'
})
export class GatherableStepComponent {
  @Input() step: GatherListEntry

  constructor() {

  }

  private clicked() {
    console.log("clicked gatherable step")
  }
}
