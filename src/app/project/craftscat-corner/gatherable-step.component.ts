import { Component, Input } from '@angular/core'

import { GatherListEntry } from '../gatherlist-entry.type'

import { ItemDataService } from '../../item/item-data.service'

@Component({
  selector: 'gatherable-step',
  templateUrl: 'gatherable-step.component.html'
})
export class GatherableStepComponent {
  @Input() step: GatherListEntry

  constructor(public itemData: ItemDataService) {

  }

  private clicked() {
    console.log("clicked gatherable step")
  }
}
