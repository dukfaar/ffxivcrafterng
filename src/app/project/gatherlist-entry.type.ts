import { Step } from './step.type'
import { Item } from '../item/item.type'

export class GatherListEntry {
  item: Item
  outstanding: number
  hq: boolean
  step: Step
}
