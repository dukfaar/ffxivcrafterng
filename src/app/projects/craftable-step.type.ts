import { Item } from '../item/item.type'
import { Step } from './step.type'

import { Recipe } from '../recipe/recipe.type'

export class CraftableStep {
  step: {
    _id: string
    amount: number
    hq: boolean
    inputs: Step[]
    item: Item
    recipe: Recipe
    step: Step
  }
}
