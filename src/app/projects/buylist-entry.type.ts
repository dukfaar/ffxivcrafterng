import { Step } from './step.type'
import { Item } from '../item/item.type'

export class BuyListEntry {
  item: Item
  outstanding: number
  hq: boolean
  step: Step
}
