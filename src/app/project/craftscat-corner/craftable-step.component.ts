import { Component, Input } from '@angular/core'

import { CraftableStep } from '../craftable-step.type'

import { ItemDataService } from '../../item/item-data.service'

@Component({
  selector: 'craftable-step',
  templateUrl: 'craftable-step.component.html'
})
export class CraftableStepComponent {
  @Input() step: CraftableStep

  constructor(public itemData: ItemDataService) {

  }

  private clicked() {
    console.log("clicked craftable step")
  }
}
